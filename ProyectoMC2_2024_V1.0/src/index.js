import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { createCamera } from "./scene/camera.js";
import { addLights } from "./scene/lights.js";
import { createRenderer } from "./scene/renderer.js";
import { addControls } from "./scene/controls.js";
import { loadModel } from "./loaders/gltfLoader.js";
import { addResizeListener } from "./scene/resizeListener.js";

// Crear la escena
const scene = new THREE.Scene();

// Crear la cámara
const camera = createCamera();

let objToRender = 'card4';
camera.position.z = objToRender === 'eye' ? 400 : objToRender === 'dino' ? 20 : objToRender === 'card2' ? 0.5 : 5;


// Agregar las luces
addLights(scene, objToRender);

// Crear el renderizador y agregarlo al DOM
const renderer = createRenderer();
document.getElementById("container3D").appendChild(renderer.domElement);


// Variables para el movimiento del ojo
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let object;

// Cargar el modelo GLTF
loadModel(`models/${objToRender}/scene.gltf`, scene, (gltf) => {
  object = gltf.scene;
  scene.add(object);
});

// Función de animación
function animate() {
  requestAnimationFrame(animate);
  if (object ) {
    object.rotation.y = -3 + mouseX / window.innerWidth * 3;
    object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
  }
  renderer.render(scene, camera);
}



// Listener para el movimiento del ratón
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
};

// Añadir el listener para redimensionar la ventana
addResizeListener(camera, renderer);

// Iniciar la animación
animate();
