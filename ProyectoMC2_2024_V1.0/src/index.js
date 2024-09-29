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

camera.position.z = 10;


// Agregar las luces
addLights(scene);

// Crear el renderizador y agregarlo al DOM
const renderer = createRenderer();
document.getElementById("container3D").appendChild(renderer.domElement);

//Cartas 3D
let objToRender = 'collectioncards/card1';
let object;
let object2, object3;

let cardnumber = 2

let objects = [object,object2,object3]

// // Cargar el modelo GLTF
// loadModel(`models/${objToRender}/scene.gltf`, scene, (gltf) => {
//   object = gltf.scene;
//   scene.add(object);
// });

//Ciclo para cargar Cartas
for (let i = 0; i <= cardnumber ; i++) {
  // Cargar el modelo GLTF3
  loadModel(`models/collectioncards/card${i+1}/scene.gltf`, scene, (gltf) => {
    objects[i] = gltf.scene;
    scene.add(objects[i]);
  });
}

// // Cargar el modelo GLTF3
// loadModel(`models/collectioncards/card02/scene.gltf`, scene, (gltf) => {
//   objects[1] = gltf.scene;
//   scene.add(objects[1]);
// });




// // Cargar el modelo GLTF3
// loadModel(`models/collectioncards/card03/scene.gltf`, scene, (gltf) => {
//   object3 = gltf.scene;
//   scene.add(object3);
// });





//Bandera para fograma inicial
let flagstart = true;

// Función de animación mouse
function animate() {
  //render inicial
  if(objects[0]){
    if (flagstart){
      objects[0].position.y = 0
      objects[1].position.x = 3
      objects[2].position.x = -3
      renderer.render(scene, camera);
      flagstart = false;
    }
  }
  


  requestAnimationFrame(animate);
  
  //SI preciona tecla arriva
  if (keyListener.isPressed(keyCode.ARROWUP)){
    //rotar a 60 fps
    let rotarcarta1 = setInterval(() => {
      objects[0].rotation.y += 0.01  
      objects[0].position.y += 0.01  
      objects[1].rotation.y -= 0.01  
      objects[1].position.y -= 0.01  
      renderer.render(scene, camera);
    }, 1000/60);
    //Detiene en tiempo determinado
    setTimeout(() => {clearInterval(rotarcarta1);},1000);
  }


  //SI preciona tecla arriva
  if (keyListener.isPressed(keyCode.ARROWDOWN)){
    //rotar a 60 fps
    let rotarcarta2 = setInterval(() => {
      objects[0].rotation.y -= 0.01  
      objects[0].position.y -= 0.01  
      objects[1].rotation.y += 0.01  
      objects[1].position.y += 0.01  
      renderer.render(scene, camera);
    }, 1000/60);
    //Detiene en tiempo determinado
    setTimeout(() => {clearInterval(rotarcarta2);},1000);
  }
  
}



// // Listener para el movimiento del ratón
// document.onmousemove = (e) => {
//   mouseX = e.clientX;
//   mouseY = e.clientY;
// };

// Añadir el listener para redimensionar la ventana
addResizeListener(camera, renderer);

// Iniciar la animación
animate();




//iniciar
loopMachine.start()
keyListener.start()
