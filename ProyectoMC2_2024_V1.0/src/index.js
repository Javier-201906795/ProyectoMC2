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


//Bandera  iniciales
let velocidad = 0.5
let flagstart = true;
let esperar = false;
let fase1 = false;
let fase2 = false;
let fase3 = false;
let fase4 = false;
let fase5 = false, fase6 = false;
let grupocard1 = []
let grupocard2 = []
let grupocard3 = []
let ordenvaraja = []


//##############################################################################
//Funciones ayudantes
function addgrupocard1(objeto){
  let flag = false
  //obtien index del objeto
  let index = objects.findIndex(x => x == objeto)
  
  // Verifica si grupocard1 no está vacío antes de entrar al bucle
  if (grupocard1.length > 0) {
    for (let i = 0; i <= grupocard1.length; i++) {
        // Verifica que grupocard1[i] y su propiedad parent existan antes de acceder a uuid
        if (grupocard1[i] === index) {
            flag = true;
            break;  // Si encuentra coincidencia, termina el bucle
        }
    }
  }
  // Si no se encuentra coincidencia, agrega el objeto
  if (!flag) {
    //Solo en index en el array central
    
    grupocard1.push(index);
  }
}

function addgrupocard2(objeto){
  let flag = false
  //obtien index del objeto
  let index = objects.findIndex(x => x == objeto)
  
  // Verifica si grupocard1 no está vacío antes de entrar al bucle
  if (grupocard2.length > 0) {
    for (let i = 0; i <= grupocard2.length; i++) {
        // Verifica que grupocard1[i] y su propiedad parent existan antes de acceder a uuid
        if (grupocard2[i] === index) {
            flag = true;
            break;  // Si encuentra coincidencia, termina el bucle
        }
    }
  }
  // Si no se encuentra coincidencia, agrega el objeto
  if (!flag) {
    //Solo en index en el array central
    
    grupocard2.push(index);
  }
}


function addgrupocard3(objeto){
  let flag = false
  //obtien index del objeto
  let index = objects.findIndex(x => x == objeto)
  
  // Verifica si grupocard1 no está vacío antes de entrar al bucle
  if (grupocard3.length > 0) {
    for (let i = 0; i <= grupocard3.length; i++) {
        // Verifica que grupocard1[i] y su propiedad parent existan antes de acceder a uuid
        if (grupocard3[i] === index) {
            flag = true;
            break;  // Si encuentra coincidencia, termina el bucle
        }
    }
  }
  // Si no se encuentra coincidencia, agrega el objeto
  if (!flag) {
    //Solo en index en el array central
    
    grupocard3.push(index);
  }
}
//##############################################################################




// Función de animación se activa cada segundo
function animate() {

  //Esperar a que cargen todos las cartas 3D
  let objetoscargados = false;
  for (let i = 0; i < cardnumber ; i++) {
    if (objects[i]){
      objetoscargados = true;
    }else{
      objetoscargados = false;
    }
  }

  //render inicial
  if(objetoscargados){
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

 
  


  if(objetoscargados){
    
    //[EMPEZAR]
    
    //Escucha la tecla ENTER
    if (keyListener.isPressed(keyCode.ENTER)) {
      if (!fase1){
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
        setTimeout(() => {clearInterval(voltear9);},3000);
        
        //Juntarlas
        let juntar9 = setInterval(() => {
          if (!esperar){
            esperar = true
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
            esperar = false
          }
          renderer.render(scene, camera);
        }, 1000/60);
        //Detiene en tiempo determinado
        setTimeout(() => {
          clearInterval(juntar9);
          fase1 = true;
          console.log("fase1", fase1)
          document.getElementById("title").innerHTML = "Precione la tecla I";
          if (fase4){
            document.getElementById("title").innerHTML = "Precione la tecla M";
          }
        },2000*velocidad);
      }
    }
    

    if (keyListener.isPressed(keyCode.KEYI)){
      console.log("estado fase1",fase1)
      if (fase1 == true && fase2 == false){
        //Repartir cartas
        let repartir = setInterval(() => {
          
          let cont = 0
          let conty = -3
          let contz = 0
          for (let i = 0; i < cardnumber ; i++) {
            cont += 1
            //Voltear cartas
            objects[i].rotation.y = 0 

            if (cont == 1){
              objects[i].position.x = -3
              objects[i].position.y = conty
              objects[i].position.z = contz
              addgrupocard1(objects[i])
            }
            if (cont == 2){
              objects[i].position.x = 0
              objects[i].position.y = conty
              objects[i].position.z = contz
              addgrupocard2(objects[i])
            }
            if (cont == 3){
              objects[i].position.x = 3
              objects[i].position.y = conty
              objects[i].position.z = contz
              addgrupocard3(objects[i])
            }
            //ciclos de 3
            if (cont >= 3){ cont = 0; conty += 1 ; contz += 0.3}
          }
          renderer.render(scene, camera);
        }, 1000/60)
        //Detiene en tiempo determinado
        setTimeout(() => {
          clearInterval(repartir);
          document.getElementById("title").innerHTML = "En que grupo esta? 1, 2, 3";
          fase2 = true
          fase3 = true
          console.log("Grupo1",grupocard1)
          console.log("Grupo2",grupocard2)
          console.log("Grupo3",grupocard3)
        },1000*velocidad);
      }
    }


    if (keyListener.isPressed(keyCode.ONE)){
      console.log("fase1",fase1,"fase2",fase2,"fase3",fase3, "fase 4", fase4)
      if (fase1 == true && fase2 == true && fase3 == true && fase4 == false && fase5 == false){
        //Repartir cartas
        let agrupar = setInterval(() => {
          let contx = 0
          let conty = 0
          let contz = 0
          //[APILAR CARTAS GRUPO INFERIOR]
          for (let i = 0; i < grupocard2.length ; i++) {
            //mover hacie el centro
            let carta = objects[grupocard2[i]]
            carta.position.y = (conty-4) + i*0.25
            carta.position.x = contx 
            carta.position.z = contz + i*0.25
            //contador
            conty += 0.1
            contx += 0.1
            contz += 0.1
          }
          //[APILAR CARTAS GRUPO MEDIO]
          //obteniendo ultima posicion para empezar
          let ultimacarta = objects[grupocard2[grupocard2.length-1]]
          contx = ultimacarta.position.x + 0.1
          conty = ultimacarta.position.y + 1
          contz = ultimacarta.position.z + 0.1
          for (let i = 0; i < grupocard1.length ; i++) {
            //mover hacie el centro
            let carta = objects[grupocard1[i]]
            carta.position.y = conty + i*0.25
            carta.position.x = contx 
            carta.position.z = contz + i*0.25
            //contador
            conty += 0.1
            contx += 0.1
            contz += 0.1
          }
          //[APILAR CARTAS GRUPO SUPERIOR]
          //obteniendo ultima posicion para empezar
          let ultimacarta2 = objects[grupocard1[grupocard2.length-1]]
          contx = ultimacarta2.position.x + 0.1
          conty = ultimacarta2.position.y + 1
          contz = ultimacarta2.position.z + 0.1
          for (let i = 0; i < grupocard3.length ; i++) {
            //mover hacie el centro
            let carta = objects[grupocard3[i]]
            carta.position.y = conty + i*0.25
            carta.position.x = contx 
            carta.position.z = contz + i*0.25
            //contador
            conty += 0.1
            contx += 0.1
            contz += 0.1
          }
          renderer.render(scene, camera);
        }, 1000/60)
        //Detiene en tiempo determinado
        setTimeout(() => {
          clearInterval(agrupar);
          document.getElementById("title").innerHTML = "..Presione Enter";
          fase4 = true
          fase1 = false
          //Almacenar orden varaja
          let cont = 0
          //grupo inferior
          for (let i = 0; i < grupocard2.length ; i++) {
            ordenvaraja[cont] = grupocard2[i]
            cont +=1
          }
          //grupo medio
          for (let i = 0; i < grupocard1.length ; i++) {
            ordenvaraja[cont] = grupocard1[i]
            cont +=1
          }
          //grupo superior
          for (let i = 0; i < grupocard3.length ; i++) {
            ordenvaraja[cont] = grupocard3[i]
            cont +=1
          }
          console.log("ordenvaraja",ordenvaraja)
          //Limpiar grupos
          grupocard1 = []
          grupocard2 = []
          grupocard3 = []
           
        },2000*velocidad);
      }
    }

    if (keyListener.isPressed(keyCode.LETTERM)){
      console.log("fase1",fase1,"fase2",fase2,"fase3",fase3, "fase 4", fase4, "fase5",fase5)
      if (fase1 == true && fase2 == true && fase3 == true && fase4 == true && fase5 == false){
        //Repartir cartas
        let creargrupos = setInterval(() => {
          let cont = 0
          let conty = -3
          let contz = 0
          for (let i = 0; i < ordenvaraja.length ; i++) {
            cont += 1
            let carta = objects[ordenvaraja[i]]
            //Voltear cartas
            carta.rotation.y = 0 
            if (cont == 1){
              carta.position.x = -3
              carta.position.y = conty
              carta.position.z = contz
              addgrupocard1(objects[ordenvaraja[i]])
            }
            if (cont == 2){
              carta.position.x = 0
              carta.position.y = conty
              carta.position.z = contz
              addgrupocard2(objects[ordenvaraja[i]])
            }
            if (cont == 3){
              carta.position.x = 3
              carta.position.y = conty
              carta.position.z = contz
              addgrupocard3(objects[ordenvaraja[i]])
            }
            //ciclos de 3
            if (cont >= 3){ cont = 0; conty += 1 ; contz += 0.3}
          }
          
          renderer.render(scene, camera);
        }, 1000/60)
        //Detiene en tiempo determinado
        setTimeout(() => {
          clearInterval(creargrupos);
          document.getElementById("title").innerHTML = "2| En que grupo esta? 1,2,3";
          fase6 = true
          console.log(grupocard1, grupocard2, grupocard3)
          fase1 = true 
          fase2 = true 
          fase3 = true
          fase4 = false
          fase5 = false

        },3000*velocidad);
      }
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
}


// Añadir el listener para redimensionar la ventana
addResizeListener(camera, renderer);

// Iniciar la animación
animate();


//iniciar
loopMachine.start()
keyListener.start()
