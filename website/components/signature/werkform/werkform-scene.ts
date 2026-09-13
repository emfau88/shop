import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

type PartState = {
  object: THREE.Object3D;
  origin: THREE.Vector3;
  offset: THREE.Vector3;
};

const details: Record<string, { title: string; copy: string }> = {
  material: { title: 'Hochfester Stahl', copy: 'Tragende Platten mit kontrollierter Kantenbearbeitung und robustem PBR-Finish.' },
  precision: { title: 'Präzisionsführung', copy: 'Spindel, Lager und Distanzringe bilden eine definierte, montagegerechte Achse.' },
  connection: { title: 'Modular verbunden', copy: 'Schrauben, Scheiben und Muttern bleiben im Exploded View einzeln nachvollziehbar.' },
  base: { title: 'Stabile Grundplatte', copy: 'Das symmetrische Bohrbild bindet die Baugruppe sicher in die spätere Montage ein.' },
};

function assetUrl(path: string) {
  const base = window.location.pathname.startsWith('/shop/') ? '/shop/' : '/';
  return `${base}${path}`;
}

function explosionOffset(name: string) {
  const side = name.includes('Left') || name.endsWith('_L') || name.includes('_FL') || name.includes('_RL') ? -1 : 1;
  if (name === 'Base_Plate') return new THREE.Vector3(0, -0.8, 0);
  if (name === 'Top_Plate') return new THREE.Vector3(0, 1.35, 0);
  if (name.startsWith('Bolt_Top')) return new THREE.Vector3(side * 0.45, 3.25, name.includes('R') ? 0.4 : -0.4);
  if (name.startsWith('Washer_Top')) return new THREE.Vector3(side * 0.3, 2.1, 0);
  if (name.startsWith('Nut_Under')) return new THREE.Vector3(side * 0.2, 0.75, 0);
  if (name === 'Upright_Left') return new THREE.Vector3(-1.25, 0, 0);
  if (name === 'Upright_Right') return new THREE.Vector3(1.25, 0, 0);
  if (name === 'Rear_Bridge') return new THREE.Vector3(0, 0, -1.25);
  if (name === 'Inner_Carriage') return new THREE.Vector3(0, 0.15, 0.85);
  if (name === 'Front_Clamp') return new THREE.Vector3(0, 0, 2.0);
  if (name.startsWith('Bolt_Front') || name.startsWith('Washer_Front')) return new THREE.Vector3(side * 0.4, 0, 2.9);
  if (name.startsWith('Bearing_')) return new THREE.Vector3(side * 1.45, 0, 0);
  if (name.startsWith('Spacer_')) return new THREE.Vector3(side * 0.75, 0, 0);
  if (name.startsWith('Gusset_')) return new THREE.Vector3(side * 0.8, -0.2, -0.35);
  return new THREE.Vector3();
}

export function initializeWerkformScene(root: HTMLElement) {
  const canvas = root.querySelector<HTMLCanvasElement>('[data-werkform-canvas]')!;
  const stage = root.querySelector<HTMLElement>('[data-werkform-stage]')!;
  if (!canvas || !stage || canvas.dataset.initialized === 'true') return () => {};
  canvas.dataset.initialized = 'true';

  const device = navigator as Navigator & { deviceMemory?: number };
  if ((device.deviceMemory ?? 4) <= 2 && (navigator.hardwareConcurrency ?? 4) <= 2) {
    stage.dataset.status = 'fallback';
    root.dataset.signatureWebgl = 'weak-device';
    return () => {};
  }

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
  } catch {
    stage.dataset.status = 'fallback';
    root.dataset.signatureWebgl = 'unsupported';
    return () => {};
  }

  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(29, 1, 0.01, 100);
  camera.position.set(8.6, 6.1, 10.8);
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0.05, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.enablePan = false;
  controls.minDistance = 9.4;
  controls.maxDistance = 17;
  controls.minPolarAngle = Math.PI * 0.23;
  controls.maxPolarAngle = Math.PI * 0.68;

  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.05).texture;
  scene.environment = environment;
  room.dispose();
  pmrem.dispose();

  const key = new THREE.DirectionalLight(0xffead0, 3.6);
  key.position.set(-5, 8, 7);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  const rim = new THREE.DirectionalLight(0xb8d8ff, 3.0);
  rim.position.set(7, 3, -5);
  scene.add(key, rim, new THREE.HemisphereLight(0xdde7e5, 0x0a0c0c, 1.15));

  const assembly = new THREE.Group();
  assembly.rotation.set(0.02, -0.42, 0);
  scene.add(assembly);
  const ground = new THREE.Mesh(new THREE.CircleGeometry(5.8, 80), new THREE.ShadowMaterial({ color: 0x000000, opacity: 0.36 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -2.52;
  ground.receiveShadow = true;
  scene.add(ground);

  const wireMaterial = new THREE.MeshBasicMaterial({ color: 0xa9c5b1, wireframe: true, transparent: true, opacity: 0.88 });
  const manufacturingMaterial = new THREE.MeshStandardMaterial({ color: 0xaeb4ad, metalness: 1, roughness: 0.2, envMapIntensity: 1.3 });
  const originalMaterials = new Map<THREE.Mesh, THREE.Material | THREE.Material[]>();
  const parts: PartState[] = [];
  const anchors = new Map<string, THREE.Object3D>();
  let model: THREE.Object3D | null = null;
  let currentState = root.dataset.signatureState ?? 'drawing';
  let currentExplosion = currentState === 'exploded' ? 1 : 0;
  let targetExplosion = currentExplosion;
  let autoRotate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let visible = true;
  let disposed = false;
  let frame = 0;
  let previous = performance.now();

  const hotspotButtons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-werkform-hotspot]'));
  const detail = root.querySelector<HTMLElement>('[data-werkform-detail]');
  const detailTitle = root.querySelector<HTMLElement>('[data-werkform-detail-title]');
  const detailCopy = root.querySelector<HTMLElement>('[data-werkform-detail-copy]');
  const detailClose = root.querySelector<HTMLButtonElement>('[data-werkform-detail-close]');
  const range = root.querySelector<HTMLInputElement>('[data-werkform-explosion]');

  function applyMaterials(state: string) {
    for (const [mesh, original] of originalMaterials) {
      mesh.material = state === 'drawing' ? wireMaterial : state === 'manufacturing' ? manufacturingMaterial : original;
      mesh.castShadow = state !== 'drawing';
    }
    ground.visible = state !== 'drawing';
  }

  function setState(state: string, syncRange = true) {
    currentState = state;
    targetExplosion = state === 'exploded' ? 1 : 0;
    if (syncRange && range) range.value = state === 'exploded' ? '100' : '0';
    applyMaterials(state);
  }

  function stopAutoRotate() {
    autoRotate = false;
    canvas.dataset.manual = 'true';
  }

  function updateHotspots() {
    const width = stage.clientWidth;
    const height = stage.clientHeight;
    hotspotButtons.forEach((button) => {
      const anchor = anchors.get(button.dataset.anchor ?? '');
      if (!anchor || !model) return;
      const point = anchor.getWorldPosition(new THREE.Vector3()).project(camera);
      const onScreen = point.z < 1 && point.z > -1;
      button.hidden = !onScreen;
      button.style.left = `${(point.x * 0.5 + 0.5) * width}px`;
      button.style.top = `${(-point.y * 0.5 + 0.5) * height}px`;
    });
  }

  function resize() {
    const width = Math.max(1, stage.clientWidth);
    const height = Math.max(1, stage.clientHeight);
    const mobile = width < 680;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.35 : 1.75));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.fov = mobile ? 38 : 29;
    camera.updateProjectionMatrix();
  }

  function render(time: number) {
    frame = 0;
    if (!visible || disposed) return;
    const delta = Math.min((time - previous) / 1000, 0.05);
    previous = time;
    if (autoRotate) assembly.rotation.y += delta * 0.13;
    const smoothing = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 1 - Math.exp(-delta * 6.5);
    currentExplosion = THREE.MathUtils.lerp(currentExplosion, targetExplosion, smoothing);
    parts.forEach((part) => part.object.position.copy(part.origin).addScaledVector(part.offset, currentExplosion));
    controls.update();
    updateHotspots();
    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  }

  function requestFrame() {
    if (!frame && visible && !disposed) frame = requestAnimationFrame(render);
  }

  new GLTFLoader().load(assetUrl('assets/signature/werkform/werkform-assembly.glb'), ({ scene: loaded }) => {
    if (disposed) return;
    const bounds = new THREE.Box3().setFromObject(loaded);
    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());
    loaded.position.sub(center);
    loaded.scale.setScalar(4.15 / Math.max(size.x, size.y, size.z));
    loaded.traverse((object) => {
      if (object.name) anchors.set(object.name, object);
      if (object instanceof THREE.Mesh) {
        originalMaterials.set(object, object.material);
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
    for (const child of loaded.children) {
      parts.push({ object: child, origin: child.position.clone(), offset: explosionOffset(child.name) });
    }
    model = loaded;
    assembly.add(loaded);
    applyMaterials(currentState);
    stage.dataset.status = 'ready';
    root.dataset.signatureWebgl = 'ready';
    requestFrame();
  }, undefined, () => {
    stage.dataset.status = 'fallback';
    root.dataset.signatureWebgl = 'asset-error';
  });

  const onState = (event: Event) => setState((event as CustomEvent<{state:string}>).detail.state);
  root.addEventListener('signaturestatechange', onState);
  const onRange = () => {
    stopAutoRotate();
    const value = Number(range?.value ?? 0) / 100;
    const explodedButton = root.querySelector<HTMLButtonElement>('[data-signature-state-target="exploded"]');
    if (value > 0 && currentState !== 'exploded') explodedButton?.click();
    targetExplosion = value;
  };
  range?.addEventListener('input', onRange);

  function closeDetail() {
    if (detail) detail.hidden = true;
    hotspotButtons.forEach((button) => button.setAttribute('aria-expanded', 'false'));
  }
  hotspotButtons.forEach((button) => {
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => {
      stopAutoRotate();
      const entry = details[button.dataset.werkformHotspot ?? ''];
      if (!entry || !detail) return;
      if (detailTitle) detailTitle.textContent = entry.title;
      if (detailCopy) detailCopy.textContent = entry.copy;
      hotspotButtons.forEach((item) => item.setAttribute('aria-expanded', String(item === button)));
      detail.hidden = false;
      detailClose?.focus();
    });
  });
  detailClose?.addEventListener('click', closeDetail);
  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && detail && !detail.hidden) {
      closeDetail();
      canvas.focus();
      return;
    }
    if (event.target !== canvas) return;
    const amount = event.shiftKey ? 0.22 : 0.09;
    if (event.key === 'ArrowLeft') assembly.rotation.y -= amount;
    else if (event.key === 'ArrowRight') assembly.rotation.y += amount;
    else if (event.key === 'ArrowUp') assembly.rotation.x = Math.max(-0.34, assembly.rotation.x - amount);
    else if (event.key === 'ArrowDown') assembly.rotation.x = Math.min(0.34, assembly.rotation.x + amount);
    else return;
    stopAutoRotate();
    event.preventDefault();
  };
  root.addEventListener('keydown', onKeydown);
  controls.addEventListener('start', stopAutoRotate);

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(stage);
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) requestFrame();
    else cancelAnimationFrame(frame);
  });
  intersectionObserver.observe(stage);
  resize();
  requestFrame();

  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    root.removeEventListener('signaturestatechange', onState);
    root.removeEventListener('keydown', onKeydown);
    range?.removeEventListener('input', onRange);
    controls.removeEventListener('start', stopAutoRotate);
    controls.dispose();
    environment.dispose();
    wireMaterial.dispose();
    manufacturingMaterial.dispose();
    renderer.dispose();
  };
}
