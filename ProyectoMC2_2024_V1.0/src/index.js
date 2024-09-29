import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { createCamera } from "./scene/camera.js";
import { addLights } from "./scene/lights.js";
import { createRenderer } from "./scene/renderer.js";
import { addControls } from "./scene/controls.js";
import { loadModel } from "./loaders/gltfLoader.js";
import { addResizeListener } from "./scene/resizeListener.js";

import loopMachine from "../js/controller/Loopmachine.js";
import keyListener from "../js/controller/KeyListener.js";
import keyCode from "../js/controller/KeyCode.js";

// Crear la escena
const scene = new THREE.Scene();

// Crear la cámara
const camera = createCamera();

//Slecciona objeto 3D a importar 
let objToRender = 'collectioncards/card01';
camera.position.z = 10;


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

let object2
// Cargar el modelo GLTF3
loadModel(`models/collectioncards/card02/scene.gltf`, scene, (gltf) => {
  object2 = gltf.scene;
  scene.add(object2);
});



let object3
// Cargar el modelo GLTF3
loadModel(`models/collectioncards/card03/scene.gltf`, scene, (gltf) => {
  object3 = gltf.scene;
  scene.add(object3);
});





//Bandera para fograma inicial
let flagstart = true;

// Función de animación mouse
function animate() {
  //render inicial
  if(object){
    if (flagstart){
      object.position.y = 0
      object2.position.x = 3
      object3.position.x = -3
      renderer.render(scene, camera);
      flagstart = false;
    }
  }
  


  requestAnimationFrame(animate);
  
  //SI preciona tecla arriva
  if (keyListener.isPressed(keyCode.ARROWUP)){
    //rotar a 60 fps
    let rotarcarta1 = setInterval(() => {
      object.rotation.y += 0.01  
      object.position.y += 0.01  
      object2.rotation.y -= 0.01  
      object2.position.y -= 0.01  
      renderer.render(scene, camera);
      console.log(object.rotation)
    }, 1000/60);
    //Detiene en tiempo determinado
    setTimeout(() => {clearInterval(rotarcarta1);},1000);
  }


  //SI preciona tecla arriva
  if (keyListener.isPressed(keyCode.ARROWDOWN)){
    //rotar a 60 fps
    let rotarcarta2 = setInterval(() => {
      object.rotation.y -= 0.01  
      object.position.y -= 0.01  
      object2.rotation.y += 0.01  
      object2.position.y += 0.01  
      renderer.render(scene, camera);
      console.log(object.rotation)
    }, 1000/60);
    //Detiene en tiempo determinado
    setTimeout(() => {clearInterval(rotarcarta2);},1000);
  }
  
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




//iniciar
loopMachine.start()
keyListener.start()
