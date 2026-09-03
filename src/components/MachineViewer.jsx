import { useEffect, useRef, useState } from 'react';
import { Loader2, RotateCcw, AlertTriangle } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import './MachineViewer.css';

// A view-only 3D viewer for the machine model: orbit, zoom and pan, nothing
// else. three.js is pulled in dynamically so it never touches the initial
// bundle — the model is only ever loaded once this component mounts.
export default function MachineViewer({ src }) {
  const { t } = useLang();
  const hostRef = useRef(null);
  const resetRef = useRef(null);
  const [state, setState] = useState('loading'); // loading | ready | error

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

        // alpha keeps the card background showing through, so the viewer
        // follows the light/dark theme without being told about it.
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        host.appendChild(renderer.domElement);

        scene.add(new THREE.HemisphereLight(0xffffff, 0x445544, 2.2));
        const key = new THREE.DirectionalLight(0xffffff, 2.2);
        key.position.set(1, 1.6, 1.2);
        scene.add(key);
        const fill = new THREE.DirectionalLight(0xffffff, 0.9);
        fill.position.set(-1.4, 0.4, -1);
        scene.add(fill);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.08;
        controls.rotateSpeed = 0.9;
        controls.zoomSpeed = 0.9;
        controls.panSpeed = 0.8;
        // keep one-finger drag rotating the model rather than scrolling the page
        controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };

        const ext = src.split('?')[0].split('.').pop().toLowerCase();
        let object;
        if (ext === 'stl') {
          const { STLLoader } = await import('three/examples/jsm/loaders/STLLoader.js');
          const geometry = await new STLLoader().loadAsync(src);
          geometry.computeVertexNormals();
          object = new THREE.Mesh(
            geometry,
            new THREE.MeshStandardMaterial({ color: 0x9aa5a1, metalness: 0.25, roughness: 0.6 }),
          );
        } else {
          const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
          const gltf = await new GLTFLoader().loadAsync(src);
          object = gltf.scene;
        }
        if (disposed) return;
        scene.add(object);

        // Centre the model on the origin and frame it, whatever units it uses.
        const box = new THREE.Box3().setFromObject(object);
        const size = box.getSize(new THREE.Vector3());
        const centre = box.getCenter(new THREE.Vector3());
        object.position.sub(centre);
        const radius = Math.max(size.x, size.y, size.z) * 0.5 || 1;
        const distance = radius / Math.sin((camera.fov * Math.PI) / 360);

        const frame = () => {
          camera.position.set(distance * 0.9, distance * 0.55, distance * 0.9);
          camera.near = distance / 100;
          camera.far = distance * 100;
          camera.updateProjectionMatrix();
          controls.target.set(0, 0, 0);
          controls.minDistance = radius * 0.3;
          controls.maxDistance = distance * 4;
          controls.update();
        };
        frame();
        resetRef.current = frame;

        const resize = () => {
          const w = host.clientWidth || 1;
          const h = host.clientHeight || 1;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(host);

        let raf = 0;
        const tick = () => {
          controls.update();
          renderer.render(scene, camera);
          raf = requestAnimationFrame(tick);
        };
        tick();
        setState('ready');

        cleanup = () => {
          cancelAnimationFrame(raf);
          ro.disconnect();
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
    <div className="model-viewer">
      <div className="model-stage" ref={hostRef} />

      {state === 'loading' && (
        <div className="model-state">
          <Loader2 className="model-spin" size={22} />
          {t('gallery.modelLoading')}
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
          <button
            type="button"
            className="model-reset"
            onClick={() => resetRef.current && resetRef.current()}
            title={t('gallery.modelReset')}
            aria-label={t('gallery.modelReset')}
          >
            <RotateCcw size={15} />
          </button>
        </>
      )}
    </div>
  );
}
