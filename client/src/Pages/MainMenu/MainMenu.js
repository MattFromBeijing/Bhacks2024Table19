import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function MainMenu() {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000);
  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(5, 10, 10);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = 5;
  controls.maxDistance = 20;
  controls.minPolarAngle = 0.5;
  controls.maxPolarAngle = 1.5;
  controls.autoRotate = false;
  controls.target = new THREE.Vector3(0, 1, 0);
  controls.update();

  const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
  groundGeometry.rotateX(-Math.PI / 2);
  const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x555555,
    side: THREE.DoubleSide,
  });
  const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
  groundMesh.castShadow = false;
  groundMesh.receiveShadow = true;
  scene.add(groundMesh);

  let earth;

  const loader = new GLTFLoader().setPath("globe/");
  loader.load(
    "scene.gltf",
    (gltf) => {
      console.log("loading model");
      earth = gltf.scene;

      earth.rotation.x = -(Math.PI / 6);
      earth.position.set(0, 4.1, 0);
      earth.scale.set(0.2, 0.2, 0.2);
      scene.add(earth);

      document.getElementById("progress-container").style.display = "none";
    },
    (xhr) => {
      console.log(`loading ${(xhr.loaded / xhr.total) * 100}%`);
    },
    (error) => {
      console.error(error);
    }
  );

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    if (earth) {
      earth.rotation.y += 0.0007; // Changes speed of rotation
    }
    renderer.render(scene, camera);
  }

  animate();
}

export default MainMenu;
