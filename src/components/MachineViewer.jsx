import { useEffect, useRef, useState, useCallback } from 'react';
import { Loader2, RotateCcw, AlertTriangle, Maximize2, Minimize2 } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import './MachineViewer.css';

// A view-only 3D viewer for the machine model: orbit, zoom, pan, reset and
// fullscreen — nothing else. three.js is pulled in dynamically so it never
// touches the initial bundle, and the model is only fetched once this mounts.
export default function MachineViewer({ src }) {
  const { t } = useLang();
  const frameRef = useRef(null); // the element that goes fullscreen
  const hostRef = useRef(null); // the canvas host
  const resetRef = useRef(null);
  const [state, setState] = useState('loading'); // loading | ready | error
  const [progress, setProgress] = useState(0);
  const [isFull, setIsFull] = useState(false);

  useEffect(() => {
    const onChange = () => setIsFull(document.fullscreenElement === frameRef.current);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = frameRef.current;
    if (!el) return;
    if (document.fullscreenElement === el) document.exitFullscreen?.();
    else el.requestFullscreen?.().catch(() => {});
  }, []);

  useEffect(() => {
    if (!src) return undefined;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      try {
        const THREE = await import('three');
        const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
        if (disposed) return;

        const host = hostRef.current;
        if (!host) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 5000);

        // alpha keeps the card colour showing through, so the viewer follows
        // the light/dark theme without being told about it.
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        host.appendChild(renderer.domElement);

        // Even, shadowless lighting: engineering clarity over showroom gloss.
        scene.add(new THREE.HemisphereLight(0xffffff, 0x445544, 2.2));
        const key = new THREE.DirectionalLight(0xffffff, 2.0);
        key.position.set(1, 1.6, 1.2);
        scene.add(key);
        const fill = new THREE.DirectionalLight(0xffffff, 0.9);
        fill.position.set(-1.4, 0.4, -1);
        scene.add(fill);
        const rim = new THREE.DirectionalLight(0xffffff, 0.5);
        rim.position.set(0, -1, -0.6);
        scene.add(rim);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.08;
        controls.rotateSpeed = 0.9;
        controls.zoomSpeed = 0.9;
        controls.panSpeed = 0.8;
        // one-finger drag orbits, two fingers pinch-zoom and pan
        controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };

        // Report download progress so a large machine model never looks stuck.
        const withProgress = (loader, url) =>
          new Promise((resolve, reject) => {
            loader.load(
              url,
              resolve,
              (e) => {
                if (e && e.lengthComputable && e.total) {
                  setProgress(Math.min(99, Math.round((e.loaded / e.total) * 100)));
                }
              },
              reject,
            );
          });

        const ext = src.split('?')[0].split('.').pop().toLowerCase();
        let object;
        if (ext === 'stl') {
          const { STLLoader } = await import('three/examples/jsm/loaders/STLLoader.js');
          const geometry = await withProgress(new STLLoader(), src);
          geometry.computeVertexNormals();
          object = new THREE.Mesh(
            geometry,
            new THREE.MeshStandardMaterial({ color: 0x9aa5a1, metalness: 0.2, roughness: 0.65 }),
          );
        } else if (ext === 'obj') {
          const { OBJLoader } = await import('three/examples/jsm/loaders/OBJLoader.js');
          object = await withProgress(new OBJLoader(), src);
        } else {
          const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
          const gltf = await withProgress(new GLTFLoader(), src);
          object = gltf.scene; // keeps the materials and colours the export carried
        }
        if (disposed) return;
        scene.add(object);

        // Centre on the origin and frame the whole model, whatever its units.
        const box = new THREE.Box3().setFromObject(object);
        const size = box.getSize(new THREE.Vector3());
        const centre = box.getCenter(new THREE.Vector3());
        object.position.sub(centre);
        const radius = Math.max(size.x, size.y, size.z) * 0.5 || 1;
        // a three-quarter view, pulled back far enough to leave the model whole
        const distance = (radius / Math.sin((camera.fov * Math.PI) / 360)) * 1.15;
        const home = new THREE.Vector3(distance * 0.78, distance * 0.5, distance * 0.78);

        camera.near = distance / 200;
        camera.far = distance * 200;
        camera.position.copy(home);
        camera.updateProjectionMatrix();
        controls.target.set(0, 0, 0);
        controls.minDistance = radius * 0.25;
        controls.maxDistance = distance * 5;
        controls.update();

        // Reset eases back to the opening view rather than snapping to it.
        let tween = null;
        resetRef.current = () => {
          tween = { from: camera.position.clone(), target: controls.target.clone(), t: 0 };
        };

        const resize = () => {
          const w = host.clientWidth || 1;
          const h = host.clientHeight || 1;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        };
        resize();
        // ResizeObserver catches layout changes (fullscreen, column collapse);
        // the window listener is a fallback for engines that throttle it.
        const ro = new ResizeObserver(resize);
        ro.observe(host);
        window.addEventListener('resize', resize);

        let raf = 0;
        let last = performance.now();
        const origin = new THREE.Vector3();
        const tick = () => {
          const now = performance.now();
          const dt = Math.min((now - last) / 1000, 0.05);
          last = now;
          if (tween) {
            tween.t = Math.min(1, tween.t + dt * 2.2);
            const e = 1 - (1 - tween.t) ** 3; // ease-out
            camera.position.lerpVectors(tween.from, home, e);
            controls.target.lerpVectors(tween.target, origin, e);
            if (tween.t >= 1) tween = null;
          }
          controls.update();
          renderer.render(scene, camera);
          raf = requestAnimationFrame(tick);
        };
        tick();
        setState('ready');

        cleanup = () => {
          cancelAnimationFrame(raf);
          ro.disconnect();
          window.removeEventListener('resize', resize);
          controls.dispose();
          scene.traverse((o) => {
            if (o.geometry) o.geometry.dispose();
            const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
            mats.forEach((m) => {
              Object.values(m).forEach((v) => v && v.isTexture && v.dispose());
              m.dispose();
            });
          });
          renderer.dispose();
          if (renderer.domElement.parentNode) {
            renderer.domElement.parentNode.removeChild(renderer.domElement);
          }
        };
      } catch (err) {
        if (!disposed) {
          console.error('MachineViewer:', err);
          setState('error');
        }
      }
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [src]);

  return (
    <div className="model-viewer" ref={frameRef}>
      <div className="model-stage" ref={hostRef} />

      {state === 'loading' && (
        <div className="model-state">
          <Loader2 className="model-spin" size={22} />
          {t('gallery.modelLoading')}
          {progress > 0 && <span className="model-progress mono">{progress}%</span>}
        </div>
      )}
      {state === 'error' && (
        <div className="model-state">
          <AlertTriangle size={22} className="accent" />
          {t('gallery.modelError')}
        </div>
      )}

      {state === 'ready' && (
        <>
          <span className="model-hint">{t('gallery.modelHint')}</span>
          <div className="model-tools">
            <button
              type="button"
              className="model-tool"
              onClick={() => resetRef.current && resetRef.current()}
              title={t('gallery.modelReset')}
              aria-label={t('gallery.modelReset')}
            >
              <RotateCcw size={15} />
            </button>
            <button
              type="button"
              className="model-tool"
              onClick={toggleFullscreen}
              title={isFull ? t('gallery.modelExitFullscreen') : t('gallery.modelFullscreen')}
              aria-label={isFull ? t('gallery.modelExitFullscreen') : t('gallery.modelFullscreen')}
            >
              {isFull ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
