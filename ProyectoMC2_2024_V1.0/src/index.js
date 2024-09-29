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
let object;
let object2, object3, object4, object5, object6, object7, object8, object9, object10, object11, object12, object13, object14, object15;
let objects = [object,object2,object3, object4,object5,object6,object7,object8,object9,object10,object11,object12,object13,object14,object15]
//Numero de cartas
let cardnumber = 9

//Ciclo para cargar Cartas
for (let i = 0; i < cardnumber ; i++) {
  // Cargar el modelo GLTF3
  loadModel(`models/collectioncards/card${i+1}/scene.gltf`, scene, (gltf) => {
    objects[i] = gltf.scene;
    scene.add(objects[i]);
  });
}


//Bandera para fograma inicial
let flagstart = true;

// Función de animación se activa cada segundo
function animate() {
  //render inicial
  if(objects[0]){
    if (flagstart){
      //numero de cartas
      if (cardnumber == 3){
        objects[0].position.x = -3
        objects[1].position.x = 0
        objects[2].position.x = 3
        renderer.render(scene, camera);
      }
      if (cardnumber == 9){
        objects[0].position.x = -3
        objects[1].position.x = 0
        objects[2].position.x = 3
        objects[3].position.x = -3
        objects[4].position.x = 0
        objects[5].position.x = 3
        objects[6].position.x = -3
        objects[7].position.x = 0
        objects[8].position.x = 3
        // //posicion y
        objects[0].position.y = 4
        objects[1].position.y = 4
        objects[2].position.y = 4
        objects[3].position.y = 0
        objects[4].position.y = 0
        objects[5].position.y = 0
        objects[6].position.y = -4
        objects[7].position.y = -4
        objects[8].position.y = -4
        renderer.render(scene, camera);
      }

      flagstart = false;

      document.getElementById("title").innerHTML = "Escoge tu carta y memorice su carta.";
    }
  }
  


  requestAnimationFrame(animate);

 

  //[EMPEZAR]
  let esperar = false;
  //Escucha la tecla ENTER
  if (keyListener.isPressed(keyCode.ENTER)) {
    //Voltear cartas
    let voltear9 = setInterval(() => {
      esperar = true
      //voltear todas las cartas
      for (let i = 0; i < cardnumber ; i++) {
        if (parseFloat(objects[i].rotation.y) < Math.PI){
          objects[i].rotation.y += 0.05
        }else{
          esperar = false
        }
      }
      renderer.render(scene, camera);
    }, 1000/60);
    //Detiene en tiempo determinado
    setTimeout(() => {clearInterval(voltear9);},2000);
    
    //Juntarlas
    let juntar9 = setInterval(() => {
      if (!esperar){
        for (let i = 0; i < cardnumber ; i++) {
          //mover hacia la arriva
          if (parseFloat(objects[i].position.y) <= 4){
            objects[i].position.y += 0.03
          }
          //mover hacia la derecha
          if (parseFloat(objects[i].position.x) >= -3){
            objects[i].position.x -= 0.03
          }
        }
      }
      renderer.render(scene, camera);
    }, 1000/60);
    //Detiene en tiempo determinado
    setTimeout(() => {clearInterval(juntar9);},2000);

    setTimeout(() => {console.log("dos segundos")},2000);
  }
  
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


// Añadir el listener para redimensionar la ventana
addResizeListener(camera, renderer);

// Iniciar la animación
animate();


//iniciar
loopMachine.start()
keyListener.start()
