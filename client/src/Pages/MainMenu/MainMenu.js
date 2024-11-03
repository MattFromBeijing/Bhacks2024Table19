import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import "./MainMenu.css";

function MainMenu() {
  const navigate = useNavigate();

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000);
  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  document.body.appendChild(renderer.domElement);
  renderer.domElement.className = "main-menu-canvas";

  const container = document.createElement("div");
  container.className = "main-menu-canvas";
  document.body.appendChild(container);
  container.appendChild(renderer.domElement);
  renderer.domElement.className = "main-menu-canvas";

  const scene = new THREE.Scene();

  // Create button container and set its class
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container"; // Button styles defined in CSS
  container.appendChild(buttonContainer);

  // Create buttons
  const startButton = document.createElement("button");
  startButton.innerText = "Start";
  startButton.className = "button"; // Add button styles
  startButton.onclick = () => {
    navigate('/coffeeshop');
  };
  buttonContainer.appendChild(startButton);

  // Set fixed camera position
  const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(5, 10, 10); // Fixed camera position
  camera.lookAt(new THREE.Vector3(0, 4.1, 0)); // Fixed look-at point

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.enableRotate = false;
  controls.target.set(0, 4.1, 0);
  controls.update();

  const groundGeometry = new THREE.PlaneGeometry(0, 0, 0, 0);
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
      earth = gltf.scene;

      // Set a fixed position for the earth
      earth.position.set(-2.75, 6.5, 0);
      earth.scale.set(0.27, 0.27, 0.27);
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
    const aspect = window.innerWidth / window.innerHeight;
    camera.aspect = aspect; // Keep the camera aspect ratio
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
