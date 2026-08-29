import { useEffect, useRef, useState, useCallback } from 'react';
import { ZoomIn, ZoomOut, Loader2, FileWarning } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import './ThesisViewer.css';

/**
 * Read-only thesis viewer.
 *
 * The document is fetched by script and painted into <canvas> elements with
 * pdf.js, so the file is never handed to the browser's built-in PDF viewer and
 * its Download / Print controls never appear. The URL is not present anywhere
 * in the DOM — no href, no src, no <object data>.
 *
 * This is a deterrent, not DRM: the bytes still have to reach the browser to be
 * drawn, so anyone reading the network panel can still retrieve the file. A
 * static site cannot prevent that; only a server that authorises each request
 * could.
 */

// Rasterise above CSS size so engineering detail survives zooming without
// re-rendering on every zoom step.
const RENDER_SCALE = 2;
const ZOOM_STEPS = [0.75, 1, 1.25, 1.5, 2];
// How far beyond the visible box a page is still worth holding painted.
const OVERSCAN_PX = 600;

/** One page: painted while active, its bitmap released once it scrolls away. */
function Page({ getPage, num, width, height, zoom, active, pageLabel }) {
  const canvasRef = useRef(null);
  const taskRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    if (!active) {
      // Free the bitmap for pages that scrolled away — the thesis runs to 234
      // pages, which held at full resolution would cost gigabytes.
      canvas.width = 0;
      canvas.height = 0;
      return undefined;
    }

    (async () => {
      try {
        const page = await getPage(num);
        if (cancelled) return;
        const viewport = page.getViewport({ scale: RENDER_SCALE });
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        taskRef.current = page.render({
          canvas,
          canvasContext: canvas.getContext('2d', { alpha: false }),
          viewport,
        });
        await taskRef.current.promise;
      } catch {
        /* a cancelled render, or a page that failed — its box simply stays blank */
      }
    })();

    return () => {
      cancelled = true;
      taskRef.current?.cancel?.();
    };
  }, [active, num, getPage]);

  return (
    <div className="thesis-page">
      <canvas
        ref={canvasRef}
        className="thesis-canvas"
        style={{ width: `${width * zoom}px`, aspectRatio: `${width} / ${height}` }}
      />
      <span className="thesis-page-num mono">{pageLabel}</span>
    </div>
  );
}

export default function ThesisViewer({ src }) {
  const { t } = useLang();
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [pages, setPages] = useState([]);
  const [zoomIndex, setZoomIndex] = useState(1);
  const [range, setRange] = useState([0, 1]);
  const docRef = useRef(null);
  const scrollerRef = useRef(null);
  const offsetsRef = useRef([]);

  const zoom = ZOOM_STEPS[zoomIndex];

  useEffect(() => {
    let cancelled = false;
    let doc = null;

    (async () => {
      try {
        // Loaded on demand so pdf.js stays out of the main bundle.
        const pdfjs = await import('pdfjs-dist');
        const worker = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
        pdfjs.GlobalWorkerOptions.workerSrc = worker.default;

        doc = await pdfjs.getDocument({ url: src }).promise;
        if (cancelled) return;
        docRef.current = doc;

        const sizes = [];
        for (let n = 1; n <= doc.numPages; n += 1) {
          const page = await doc.getPage(n);
          const vp = page.getViewport({ scale: 1 });
          sizes.push({ num: n, width: vp.width, height: vp.height });
          if (cancelled) return;
        }
        setPages(sizes);
        setStatus('ready');
      } catch {
        if (!cancelled) setStatus('error');
      }
    })();

    return () => {
      cancelled = true;
      doc?.destroy?.();
      docRef.current = null;
    };
  }, [src]);

  const getPage = useCallback((n) => docRef.current.getPage(n), []);

  /* Which pages are worth painting. Measured straight off the layout rather
     than through IntersectionObserver, so the first pages appear as soon as
     they are laid out instead of waiting on an observer callback. */
  const measure = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    offsetsRef.current = Array.from(el.children).map((child) => {
      const r = child.getBoundingClientRect();
      return { top: r.top - box.top + el.scrollTop, height: r.height };
    });
  }, []);

  const update = useCallback(() => {
    const el = scrollerRef.current;
    const offsets = offsetsRef.current;
    if (!el || !offsets.length) return;
    const from = el.scrollTop - OVERSCAN_PX;
    const to = el.scrollTop + el.clientHeight + OVERSCAN_PX;
    let first = -1;
    let last = -1;
    offsets.forEach((o, i) => {
      if (o.top + o.height >= from && o.top <= to) {
        if (first === -1) first = i;
        last = i;
      }
    });
    if (first === -1) {
      first = 0;
      last = 0;
    }
    setRange((prev) => (prev[0] === first && prev[1] === last ? prev : [first, last]));
  }, []);

  useEffect(() => {
    if (status !== 'ready') return undefined;
    const el = scrollerRef.current;
    if (!el) return undefined;

    const remeasure = () => {
      measure();
      update();
    };
    remeasure();

    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', remeasure);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', remeasure);
    };
  }, [status, zoom, pages.length, measure, update]);

  if (status === 'loading') {
    return (
      <div className="thesis-state">
        <Loader2 className="thesis-spin" size={26} />
        <p>{t('docs.viewerLoading')}</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="thesis-state">
        <FileWarning size={26} />
        <p>{t('docs.viewerError')}</p>
      </div>
    );
  }

  return (
    <div className="thesis-viewer">
      <div className="thesis-toolbar">
        <span className="thesis-count mono">
          {t('docs.pages')} {pages.length}
        </span>
        <span className="thesis-zoom">
          <button
            className="thesis-zoom-btn"
            onClick={() => setZoomIndex((i) => Math.max(0, i - 1))}
            disabled={zoomIndex === 0}
            aria-label={t('docs.zoomOut')}
          >
            <ZoomOut size={16} />
          </button>
          <span className="thesis-zoom-val mono">{Math.round(zoom * 100)}%</span>
          <button
            className="thesis-zoom-btn"
            onClick={() => setZoomIndex((i) => Math.min(ZOOM_STEPS.length - 1, i + 1))}
            disabled={zoomIndex === ZOOM_STEPS.length - 1}
            aria-label={t('docs.zoomIn')}
          >
            <ZoomIn size={16} />
          </button>
        </span>
      </div>

      {/* dir=ltr: the thesis pages are a document, not part of the RTL layout */}
      <div className="thesis-pages" dir="ltr" ref={scrollerRef}>
        {pages.map((p, i) => (
          <Page
            key={p.num}
            getPage={getPage}
            num={p.num}
            width={p.width}
            height={p.height}
            zoom={zoom}
            active={i >= range[0] && i <= range[1]}
            pageLabel={`${p.num} / ${pages.length}`}
          />
        ))}
      </div>

      {/* only ever visible on paper, where the pages themselves are hidden */}
      <p className="thesis-print-note">{t('docs.printNote')}</p>
    </div>
  );
}
