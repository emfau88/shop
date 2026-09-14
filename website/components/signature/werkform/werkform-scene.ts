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
  material: { title: 'Steife Seitenwangen', copy: 'Zwei verrippte Stahlwangen nehmen die Radiallast der Umlenkrolle auf und leiten sie in die Grundplatte.' },
  precision: { title: 'Servicefähige Lagerung', copy: 'Schulterachse, Lagerkartuschen und Distanzringe führen die Rolle spielfrei und bleiben einzeln austauschbar.' },
  connection: { title: 'Gesicherte Achse', copy: 'Endschrauben und Sicherungsscheiben fixieren die Lagerfolge entlang einer klaren Montageachse.' },
  base: { title: 'Definierte Krafteinleitung', copy: 'Vier Ankerpunkte binden den Rollenbock formstabil an das Maschinenbett an.' },
};

function assetUrl(path: string) {
  const base = window.location.pathname.startsWith('/shop/') ? '/shop/' : '/';
  return `${base}${path}`;
}

function explosionOffset(name: string) {
  const side = name.includes('Left') || name.endsWith('_L') || name.includes('_L_') || name.includes('_FL') || name.includes('_RL') ? -1 : 1;
  if (name === 'Base_Plate') return new THREE.Vector3();
  if (name.startsWith('Base_Bolt')) return new THREE.Vector3(0, 2.3, 0);
  if (name.startsWith('Base_Washer')) return new THREE.Vector3(0, 1.18, 0);
  if (name.startsWith('Side_Cheek')) return new THREE.Vector3(side * 0.9, 0, 0);
  if (name === 'Rear_Cross_Brace') return new THREE.Vector3(0, 0, -0.82);
  if (name === 'Idler_Roller') return new THREE.Vector3(0, 0.42, 0);
  if (name === 'Roller_Shaft') return new THREE.Vector3(-1.72, 0, 0);
  if (name.startsWith('Bearing_Housing')) return new THREE.Vector3(side * 1.25, 0, 0);
  if (name.startsWith('Bearing_Cartridge')) return new THREE.Vector3(side * 1.78, 0, 0);
  if (name.startsWith('Spacer_')) return new THREE.Vector3(side * 0.7, 0, 0);
  if (name.startsWith('Retaining_Washer')) return new THREE.Vector3(side * 2.25, 0, 0);
  if (name.startsWith('Shaft_End_Bolt')) return new THREE.Vector3(side * 3.05, 0, 0);
  if (name.startsWith('Housing_Bolt')) return new THREE.Vector3(side * 2.55, 0, 0);
  if (name.startsWith('Gusset_')) return new THREE.Vector3(side * 0.58, -0.14, -0.18);
  return new THREE.Vector3();
}

function brushedTexture() {
  const size = 256;
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y += 1) {
    const broad = Math.sin(y * 0.31) * 13 + Math.sin(y * 1.73) * 5;
    for (let x = 0; x < size; x += 1) {
      const noise = ((x * 17 + y * 131 + (x * y) % 37) % 29) - 14;
      const value = THREE.MathUtils.clamp(Math.round(164 + broad + noise * 0.7), 92, 224);
      const index = (y * size + x) * 4;
      data[index] = value;
      data[index + 1] = value;
      data[index + 2] = value;
      data[index + 3] = 255;
    }
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3.5, 8);
  texture.needsUpdate = true;
  return texture;
}

const cameraCompositions: Record<string, { position: THREE.Vector3; target: THREE.Vector3; fov: number }> = {
  drawing: { position: new THREE.Vector3(6.2, 4.7, 8.7), target: new THREE.Vector3(0, -0.2, 0), fov: 31 },
  manufacturing: { position: new THREE.Vector3(5.6, 4.1, 7.8), target: new THREE.Vector3(0, -0.08, 0), fov: 29 },
  component: { position: new THREE.Vector3(5.4, 3.8, 7.4), target: new THREE.Vector3(0, -0.1, 0), fov: 28 },
  exploded: { position: new THREE.Vector3(6, 4.3, 8.3), target: new THREE.Vector3(0, -0.14, 0), fov: 31 },
};

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
  renderer.toneMapping = THREE.AgXToneMapping;
  renderer.toneMappingExposure = 1.16;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  const initialComposition = cameraCompositions[root.dataset.signatureState ?? 'exploded'];
  const camera = new THREE.PerspectiveCamera(initialComposition.fov, 1, 0.01, 100);
  camera.position.copy(initialComposition.position);
  const controls = new OrbitControls(camera, canvas);
  controls.target.copy(initialComposition.target);
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.enablePan = false;
  controls.minDistance = 7.4;
  controls.maxDistance = 15;
  controls.minPolarAngle = Math.PI * 0.23;
  controls.maxPolarAngle = Math.PI * 0.68;

  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const reflectionPanels = [
    { position: [-6, 5, 4], scale: [5.5, 2.2], color: 0xffe6c7 },
    { position: [6, 3.2, -3.5], scale: [3.8, 5.5], color: 0xbcd4dd },
    { position: [0, 8, 1], scale: [4.5, 2.2], color: 0xffffff },
  ] as const;
  const reflectionMeshes: THREE.Mesh[] = [];
  reflectionPanels.forEach((panel) => {
    const reflector = new THREE.Mesh(
      new THREE.PlaneGeometry(panel.scale[0], panel.scale[1]),
      new THREE.MeshBasicMaterial({ color: panel.color, side: THREE.DoubleSide }),
    );
    reflector.position.set(panel.position[0], panel.position[1], panel.position[2]);
    reflector.lookAt(0, 0, 0);
    room.add(reflector);
    reflectionMeshes.push(reflector);
  });
  const environment = pmrem.fromScene(room, 0.035).texture;
  scene.environment = environment;
  reflectionMeshes.forEach((reflector) => {
    reflector.geometry.dispose();
    (reflector.material as THREE.Material).dispose();
  });
  room.dispose();
  pmrem.dispose();

  const key = new THREE.DirectionalLight(0xffdfbd, 4.35);
  key.position.set(-5.8, 8.5, 6.5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.bias = -0.00035;
  key.shadow.radius = 3;
  const rim = new THREE.DirectionalLight(0xb9d6dc, 3.8);
  rim.position.set(7.5, 4.2, -5.5);
  const fill = new THREE.DirectionalLight(0x9bb0a5, 0.82);
  fill.position.set(1, 2, 8);
  scene.add(key, rim, fill, new THREE.HemisphereLight(0xdce7e1, 0x050706, 0.62));

  const assembly = new THREE.Group();
  const baseRotationY = -0.42;
  assembly.rotation.set(0.02, baseRotationY, 0);
  scene.add(assembly);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(12, 10), new THREE.ShadowMaterial({ color: 0x000000, opacity: 0.27 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -2.02;
  ground.receiveShadow = true;
  scene.add(ground);

  const texture = brushedTexture();
  const steelMaterial = new THREE.MeshPhysicalMaterial({ color: 0x555b59, metalness: 1, roughness: 0.27, roughnessMap: texture, bumpMap: texture, bumpScale: 0.018, anisotropy: 0.48, envMapIntensity: 1.55 });
  const darkMaterial = new THREE.MeshPhysicalMaterial({ color: 0x161a19, metalness: 1, roughness: 0.34, roughnessMap: texture, bumpMap: texture, bumpScale: 0.012, anisotropy: 0.32, envMapIntensity: 1.38 });
  const machinedMaterial = new THREE.MeshPhysicalMaterial({ color: 0x9a9e9b, metalness: 1, roughness: 0.18, roughnessMap: texture, bumpMap: texture, bumpScale: 0.009, anisotropy: 0.62, envMapIntensity: 1.72 });
  const cadFillMaterial = new THREE.MeshPhysicalMaterial({ color: 0x8fa99a, metalness: 0.35, roughness: 0.45, transparent: true, opacity: 0.11, depthWrite: false });
  const manufacturingMaterial = new THREE.MeshPhysicalMaterial({ color: 0x7e8782, metalness: 1, roughness: 0.22, roughnessMap: texture, bumpMap: texture, bumpScale: 0.012, envMapIntensity: 1.6 });
  const cadLineMaterial = new THREE.LineBasicMaterial({ color: 0xb9d7c4, transparent: true, opacity: 0.92 });
  const originalMaterials = new Map<THREE.Mesh, THREE.Material | THREE.Material[]>();
  const cadEdges: THREE.LineSegments[] = [];
  const cadGrid = new THREE.GridHelper(8.5, 16, 0x71897a, 0x334039);
  cadGrid.position.y = -1.99;
  cadGrid.material.transparent = true;
  cadGrid.material.opacity = 0.34;
  cadGrid.visible = false;
  assembly.add(cadGrid);
  const parts: PartState[] = [];
  const anchors = new Map<string, THREE.Object3D>();
  let model: THREE.Object3D | null = null;
  let currentState = root.dataset.signatureState ?? 'drawing';
  let currentExplosion = currentState === 'exploded' ? 1 : 0;
  let targetExplosion = currentExplosion;
  let autoRotate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let intersectsViewport = true;
  let visible = !document.hidden;
  let disposed = false;
  let frame = 0;
  let previous = performance.now();
  const idleStartedAt = previous;
  const cameraGoal = initialComposition.position.clone();
  const targetGoal = initialComposition.target.clone();
  let fovGoal = initialComposition.fov;
  let cameraSettling = false;

  const hotspotButtons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-werkform-hotspot]'));
  const detail = root.querySelector<HTMLElement>('[data-werkform-detail]');
  const detailTitle = root.querySelector<HTMLElement>('[data-werkform-detail-title]');
  const detailCopy = root.querySelector<HTMLElement>('[data-werkform-detail-copy]');
  const detailClose = root.querySelector<HTMLButtonElement>('[data-werkform-detail-close]');
  const range = root.querySelector<HTMLInputElement>('[data-werkform-explosion]');

  function cameraForState(state: string, immediate = false) {
    const composition = cameraCompositions[state] ?? cameraCompositions.component;
    const mobile = stage.clientWidth < 680;
    cameraGoal.copy(composition.position).multiplyScalar(mobile ? 1.18 : 1);
    targetGoal.copy(composition.target);
    fovGoal = mobile ? Math.max(composition.fov, 36) : composition.fov;
    cameraSettling = !immediate;
    if (immediate) {
      camera.position.copy(cameraGoal);
      controls.target.copy(targetGoal);
      camera.fov = fovGoal;
      camera.updateProjectionMatrix();
    }
  }

  function applyMaterials(state: string) {
    for (const [mesh, original] of originalMaterials) {
      mesh.material = state === 'drawing' ? cadFillMaterial : state === 'manufacturing' ? manufacturingMaterial : original;
      mesh.castShadow = state !== 'drawing';
    }
    cadEdges.forEach((edge) => { edge.visible = state === 'drawing'; });
    cadGrid.visible = state === 'drawing';
    ground.visible = state !== 'drawing';
  }

  function setState(state: string, syncRange = true) {
    currentState = state;
    targetExplosion = state === 'exploded' ? 1 : state === 'manufacturing' ? 0.16 : 0;
    if (syncRange && range) range.value = state === 'exploded' ? '100' : '0';
    applyMaterials(state);
    cameraForState(state);
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
      const line = root.querySelector<SVGPathElement>(`[data-werkform-line="${button.dataset.werkformHotspot}"]`);
      button.hidden = !onScreen;
      if (line) line.style.display = onScreen ? '' : 'none';
      if (!onScreen) return;
      const anchorX = (point.x * 0.5 + 0.5) * width;
      const anchorY = (-point.y * 0.5 + 0.5) * height;
      const labelX = width * Number(button.dataset.labelX ?? 78) / 100;
      const labelY = height * Number(button.dataset.labelY ?? 50) / 100;
      button.style.left = `${labelX}px`;
      button.style.top = `${labelY}px`;
      if (line) {
        const elbowX = labelX > anchorX ? labelX - 34 : labelX + 34;
        line.setAttribute('d', `M ${anchorX.toFixed(1)} ${anchorY.toFixed(1)} L ${elbowX.toFixed(1)} ${anchorY.toFixed(1)} L ${labelX.toFixed(1)} ${labelY.toFixed(1)}`);
      }
    });
  }

  function resize() {
    const width = Math.max(1, stage.clientWidth);
    const height = Math.max(1, stage.clientHeight);
    const mobile = width < 680;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.35 : 1.75));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    const composition = cameraCompositions[currentState] ?? cameraCompositions.component;
    fovGoal = mobile ? Math.max(composition.fov, 36) : composition.fov;
    if (!cameraSettling) camera.fov = fovGoal;
    camera.updateProjectionMatrix();
    const guide = root.querySelector<SVGSVGElement>('[data-werkform-guides]');
    guide?.setAttribute('viewBox', `0 0 ${width} ${height}`);
  }

  function render(time: number) {
    frame = 0;
    if (!visible || disposed) return;
    const delta = Math.min((time - previous) / 1000, 0.05);
    previous = time;
    if (autoRotate) {
      const drift = Math.sin((time - idleStartedAt) * 0.00024) * THREE.MathUtils.degToRad(6.5);
      assembly.rotation.y = baseRotationY + drift;
    }
    const smoothing = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 1 - Math.exp(-delta * 6.5);
    currentExplosion = THREE.MathUtils.lerp(currentExplosion, targetExplosion, smoothing);
    parts.forEach((part) => part.object.position.copy(part.origin).addScaledVector(part.offset, currentExplosion));
    if (cameraSettling) {
      const cameraSmoothing = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 1 - Math.exp(-delta * 4.8);
      camera.position.lerp(cameraGoal, cameraSmoothing);
      controls.target.lerp(targetGoal, cameraSmoothing);
      camera.fov = THREE.MathUtils.lerp(camera.fov, fovGoal, cameraSmoothing);
      camera.updateProjectionMatrix();
      if (camera.position.distanceTo(cameraGoal) < 0.006 && controls.target.distanceTo(targetGoal) < 0.006 && Math.abs(camera.fov - fovGoal) < 0.02) cameraSettling = false;
    }
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
    const size = bounds.getSize(new THREE.Vector3());
    loaded.scale.setScalar(5.65 / Math.max(size.x, size.y, size.z));
    const scaledBounds = new THREE.Box3().setFromObject(loaded);
    const scaledCenter = scaledBounds.getCenter(new THREE.Vector3());
    loaded.position.x -= scaledCenter.x;
    loaded.position.z -= scaledCenter.z;
    loaded.position.y += ground.position.y - scaledBounds.min.y + 0.025;
    const sourceMaterials = new Set<THREE.Material>();
    loaded.traverse((object) => {
      if (object.name) anchors.set(object.name, object);
      if (object instanceof THREE.Mesh) {
        const source = Array.isArray(object.material) ? object.material[0] : object.material;
        if (Array.isArray(object.material)) object.material.forEach((material) => sourceMaterials.add(material));
        else sourceMaterials.add(object.material);
        const premiumMaterial = source?.name.includes('Dark') || source?.name.includes('Recess') ? darkMaterial : source?.name.includes('Machined') ? machinedMaterial : steelMaterial;
        object.material = premiumMaterial;
        originalMaterials.set(object, premiumMaterial);
        object.castShadow = true;
        object.receiveShadow = true;
        const edge = new THREE.LineSegments(new THREE.EdgesGeometry(object.geometry, 28), cadLineMaterial);
        edge.visible = false;
        edge.renderOrder = 4;
        object.add(edge);
        cadEdges.push(edge);
      }
    });
    sourceMaterials.forEach((material) => material.dispose());
    for (const child of loaded.children) {
      parts.push({ object: child, origin: child.position.clone(), offset: explosionOffset(child.name) });
    }
    model = loaded;
    assembly.add(loaded);
    applyMaterials(currentState);
    cameraForState(currentState, true);
    stage.dataset.status = 'ready';
    root.dataset.signatureWebgl = 'ready';
    requestFrame();
  }, undefined, () => {
    stage.dataset.status = 'fallback';
    root.dataset.signatureWebgl = 'asset-error';
  });

  const onState = (event: Event) => {
    stopAutoRotate();
    setState((event as CustomEvent<{state:string}>).detail.state);
  };
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
    intersectsViewport = entry.isIntersecting;
    visible = intersectsViewport && !document.hidden;
    if (visible) requestFrame();
    else {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  });
  const onVisibilityChange = () => {
    visible = intersectsViewport && !document.hidden;
    if (visible) {
      previous = performance.now();
      requestFrame();
    } else {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  };
  document.addEventListener('visibilitychange', onVisibilityChange);
  intersectionObserver.observe(stage);
  resize();
  requestFrame();

  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    document.removeEventListener('visibilitychange', onVisibilityChange);
    root.removeEventListener('signaturestatechange', onState);
    root.removeEventListener('keydown', onKeydown);
    range?.removeEventListener('input', onRange);
    controls.removeEventListener('start', stopAutoRotate);
    controls.dispose();
    environment.dispose();
    texture.dispose();
    steelMaterial.dispose();
    darkMaterial.dispose();
    machinedMaterial.dispose();
    cadFillMaterial.dispose();
    manufacturingMaterial.dispose();
    cadLineMaterial.dispose();
    cadEdges.forEach((edge) => edge.geometry.dispose());
    model?.traverse((object) => {
      if (object instanceof THREE.Mesh) object.geometry.dispose();
    });
    ground.geometry.dispose();
    (ground.material as THREE.Material).dispose();
    cadGrid.geometry.dispose();
    if (Array.isArray(cadGrid.material)) cadGrid.material.forEach((material) => material.dispose());
    else cadGrid.material.dispose();
    renderer.dispose();
  };
}
