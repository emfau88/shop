import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export type StageId = 'drawing' | 'manufacturing' | 'component';

export const metalStages = [
  {
    id: 'drawing' as const,
    number: '01',
    label: 'Zeichnung',
    eyebrow: 'Eingangsdaten',
    title: 'Kontur und Bezug zuerst.',
    text: 'Das Drahtmodell legt Kontur, Radien und Anschlusspunkte offen, bevor Material bewegt wird.',
    facts: ['GLB / STEP', 'Aluminium', 'PBR-Modell'],
  },
  {
    id: 'manufacturing' as const,
    number: '02',
    label: 'Fertigung',
    eyebrow: 'Bearbeitungsfolge',
    title: 'Kanten, Radien, Aufnahmen.',
    text: 'Die Fertigungsansicht hebt komplexe Übergänge und Funktionsflächen hervor. So wird aus Geometrie eine kontrollierte Reihenfolge.',
    facts: ['Laserkontur', 'Abkanten', 'Anschlusspunkte'],
  },
  {
    id: 'component' as const,
    number: '03',
    label: 'Bauteil',
    eyebrow: 'Übergabe',
    title: 'Geometrie, die weiterarbeitet.',
    text: 'Der fertige Sonderhalter zeigt Oberfläche, Material und Funktion als zusammenhängendes Ergebnis.',
    facts: ['PBR-Oberfläche', 'Geometrie geprüft', 'WF-042'],
  },
];

export type MetalViewer = {
  dispose: () => void;
  reset: () => void;
  setStage: (stage: StageId) => void;
};

type MeshState = {
  mesh: THREE.Mesh;
  material: THREE.Material | THREE.Material[];
};

const viewerModel = 'assets/metal/mech-foot/werkform-holder.glb';

function assetUrl(path: string) {
  const base = window.location.pathname.startsWith('/shop/') ? '/shop/' : '/';
  return `${base}${path}`;
}

export function createMetalViewer(
  canvas: HTMLCanvasElement,
  onReady: () => void,
  onError: () => void,
): MetalViewer | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas,
      powerPreference: 'high-performance',
    });
  } catch {
    return null;
  }

  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.82;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(31, 1, 0.01, 100);
  const cameraPosition = new THREE.Vector3(3.55, 2.4, 4.95);
  camera.position.copy(cameraPosition);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.minPolarAngle = Math.PI * 0.18;
  controls.maxPolarAngle = Math.PI * 0.78;
  controls.target.set(0, 0, 0);
  controls.saveState();

  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.045).texture;
  scene.environment = environment;
  room.dispose();
  pmrem.dispose();

  const keyLight = new THREE.DirectionalLight(0xf3f7ff, 3.1);
  keyLight.position.set(-4, 6, 4);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(0xff5a24, 1.45);
  rimLight.position.set(4, 1, -4);
  scene.add(rimLight, new THREE.HemisphereLight(0x9bb3bf, 0x101214, 0.85));

  const assembly = new THREE.Group();
  assembly.rotation.set(0.06, -0.5, 0);
  scene.add(assembly);
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(6.4, 6.4),
    new THREE.ShadowMaterial({ color: 0x000000, opacity: 0.34 }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.receiveShadow = true;
  shadow.visible = false;
  scene.add(shadow);

  const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0xf05a28,
    transparent: true,
    opacity: 0.9,
    wireframe: true,
  });
  const manufacturingMaterial = new THREE.MeshStandardMaterial({
    color: 0xe95520,
    metalness: 0.82,
    roughness: 0.31,
  });
  const componentMaterial = new THREE.MeshStandardMaterial({
    color: 0x666d71,
    metalness: 0.98,
    roughness: 0.34,
    envMapIntensity: 1.05,
  });
  const meshStates: MeshState[] = [];
  let currentStage: StageId = 'component';
  let loadedModel: THREE.Object3D | null = null;
  let automaticRotation = !window.matchMedia('(prefers-reduced-motion: reduce)')
    .matches;
  let visible = true;
  let disposed = false;
  let frame = 0;
  let lastTime = performance.now();

  function applyStage(stage: StageId) {
    currentStage = stage;
    canvas.dataset.stage = stage;
    for (const state of meshStates) {
      state.mesh.material =
        stage === 'drawing'
          ? wireMaterial
          : stage === 'manufacturing'
            ? manufacturingMaterial
            : componentMaterial;
      state.mesh.castShadow = stage !== 'drawing';
    }
    shadow.visible = stage !== 'drawing' && Boolean(loadedModel);
  }

  new GLTFLoader().load(
    assetUrl(viewerModel),
    ({ scene: model }) => {
      if (disposed) return;
      model.updateMatrixWorld(true);
      const sourceBox = new THREE.Box3().setFromObject(model);
      const center = sourceBox.getCenter(new THREE.Vector3());
      const size = sourceBox.getSize(new THREE.Vector3());
      const modelScale = 3.95 / Math.max(size.x, size.y, size.z);
      model.position.sub(center);
      const modelPivot = new THREE.Group();
      modelPivot.add(model);
      modelPivot.scale.setScalar(modelScale);
      modelPivot.rotation.set(0.13, 0, -0.12);
      loadedModel = modelPivot;
      model.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;
          meshStates.push({ material: object.material, mesh: object });
        }
      });
      assembly.add(modelPivot);
      modelPivot.updateMatrixWorld(true);
      shadow.position.y =
        new THREE.Box3().setFromObject(modelPivot).min.y - 0.035;
      applyStage(currentStage);
      canvas.dataset.ready = 'true';
      onReady();
    },
    undefined,
    () => {
      if (!disposed) onError();
    },
  );

  function setCameraForAspect(aspect: number) {
    const portraitDistance = aspect < 1 ? 1 + (1 - aspect) * 0.82 : 1;
    camera.position.copy(cameraPosition).multiplyScalar(portraitDistance);
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.65));
    renderer.setSize(Math.max(1, rect.width), Math.max(1, rect.height), false);
    camera.aspect = Math.max(1, rect.width) / Math.max(1, rect.height);
    setCameraForAspect(camera.aspect);
    camera.updateProjectionMatrix();
  }

  function draw(time: number) {
    frame = 0;
    if (!visible || disposed) return;
    const delta = Math.min((time - lastTime) / 1000, 0.05);
    lastTime = time;
    if (automaticRotation) assembly.rotation.y += delta * 0.19;
    controls.update();
    renderer.render(scene, camera);
    frame = requestAnimationFrame(draw);
  }

  function requestFrame() {
    if (!frame && visible && !disposed) frame = requestAnimationFrame(draw);
  }
  function stopAutomaticRotation() {
    automaticRotation = false;
    canvas.dataset.manual = 'true';
  }
  function onKeyDown(event: KeyboardEvent) {
    const amount = event.shiftKey ? 0.2 : 0.08;
    if (event.key === 'ArrowLeft') assembly.rotation.y -= amount;
    else if (event.key === 'ArrowRight') assembly.rotation.y += amount;
    else if (event.key === 'ArrowUp') assembly.rotation.x -= amount;
    else if (event.key === 'ArrowDown') assembly.rotation.x += amount;
    else return;
    stopAutomaticRotation();
    event.preventDefault();
  }

  controls.addEventListener('start', stopAutomaticRotation);
  canvas.addEventListener('keydown', onKeyDown);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) requestFrame();
  });
  intersectionObserver.observe(canvas);
  resize();
  requestFrame();

  return {
    setStage: applyStage,
    reset() {
      assembly.rotation.set(0.06, -0.5, 0);
      controls.reset();
      setCameraForAspect(camera.aspect);
      automaticRotation = !window.matchMedia('(prefers-reduced-motion: reduce)')
        .matches;
      delete canvas.dataset.manual;
      canvas.focus();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      controls.removeEventListener('start', stopAutomaticRotation);
      controls.dispose();
      canvas.removeEventListener('keydown', onKeyDown);
      environment.dispose();
      shadow.geometry.dispose();
      (shadow.material as THREE.Material).dispose();
      wireMaterial.dispose();
      manufacturingMaterial.dispose();
      componentMaterial.dispose();
      renderer.dispose();
    },
  };
}
