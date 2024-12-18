import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { createCamera } from "./scene/camera.js";
import { addLights } from "./scene/lights.js";
import { createRenderer } from "./scene/renderer.js";
import { addControls } from "./scene/controls.js";
import { loadModel } from "./loaders/gltfLoader.js";
import { addResizeListener } from "./scene/resizeListener.js";

import keyListener from "./js/controller/KeyListener.js";
import keyCode from "./js/controller/KeyCode.js";



//PROYECTO MC2 2024
//ALUMNO: Javier Ricardo Yllescas Barrios
//CARNE: 201906795
//Version Programa: V4.0.0
//{ Funciona con 3, 9, 15, 21, 27, 33 cartas }




// Crear la escena
const scene = new THREE.Scene();

// Crear la cámara
const camera = createCamera();
camera.position.z = 10;


// Agregar las luces
addLights(scene);

// Crear el renderizador y agregarlo al DOM
const renderer = createRenderer();
document.getElementById("container3D").appendChild(renderer.domElement);

//Cartas 3D
let object;
let object2, object3, object4, object5, object6, object7, object8, object9, object10, object11, object12, object13, object14, object15, object16, object17, object18, object19, object20, object21, object22, object23, object24, object25, object26, object27, object28, object29, object30, object31, object32,object33;
let objects = [object,object2,object3, object4,object5,object6,object7,object8,object9,object10,object11,object12,object13,object14,object15, object16, object17, object18, object19, object20, object21, object22, object23, object24, object25, object26, object27, object28, object29, object30, object31, object32,object33]
//Numero de cartas
let url = window.location.pathname.split('/').pop()
let cardnumber = parseInt(url)
// console.log(url)
console.log("cardnumber", cardnumber)
//Camara posicion
if (cardnumber == 3){
  camera.position.z = 10;
}else if (cardnumber == 9){
  camera.position.z = 7;
}else if (cardnumber == 15){
  camera.position.z = 10.8;
}else if (cardnumber == 21){
  camera.position.z = 11;
}else if (cardnumber == 27){
  camera.position.z = 11;
}else if (cardnumber == 33){
  camera.position.z = 12;
}else if (cardnumber == 39){
  camera.position.z = 15;
  camera.position.y = camera.position.y - 2
}else{
  camera.position.z = 11;
}




//Ciclo para cargar Cartas
for (let i = 0; i < cardnumber ; i++) {
  // Cargar el modelo GLTF3
  loadModel(`models/collectioncards/card${i+1}/scene.gltf`, scene, (gltf) => {
    objects[i] = gltf.scene;
    scene.add(objects[i]);
  });
}




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

function funcionnumerodelanzamientos(numero){
  let num = parseInt(numero)
  let funcion = Math.log(num)/ Math.log(3);
  //Funcion Tope
  // Aplica redondeo personalizado
  if (funcion >= 2.20) {
    funcion = Math.ceil(funcion); // Redondea hacia arriba
  } else if (funcion <= 2.15) {
    funcion = Math.floor(funcion); // Redondea hacia abajo
  } else {
    funcion = Math.round(funcion); 
  }
  return parseInt(funcion)
}

function cartaadivinar(){
  let cartastotal = parseInt(cardnumber)
  let cartaadivinar = cartastotal+1
  cartaadivinar = cartaadivinar/2
  return parseInt(cartaadivinar)
}

let flagfinal = false

function final(){
  if (!flagfinal){
    //camara
    let numerodecartas = parseInt(cardnumber)
    camera.position.z = numerodecartas === 21 ? 7: numerodecartas === 27 ? 8: numerodecartas === 33 ? 10: numerodecartas === 39 ? 10: 5;
    console.log("zoom", camera.position.z )
    camera.position.y = numerodecartas === 21 ? caminiy: numerodecartas === 27 ? caminiy: numerodecartas === 33 ? caminiy: numerodecartas === 39 ? caminiy+2: caminiy;
    //obtener numero de carta
    let cartaseleccionada = cartaadivinar()
    console.log("Cartan seleccionanda:",cartaseleccionada)
    console.log("orden varaja:",ordenvaraja)
    let cartaG =  objects[ordenvaraja[cartaseleccionada-1]]
    cartaG.position.x = 0
    cartaG.position.y = 0
    cartaG.rotation.y = 0
    renderer.render(scene, camera);
    // flagfinal = true
    document.getElementById("title").innerHTML = "Esta es tu Carta. Presiona (M)";
    //Redireccionar a menu
    setTimeout(function() {
      window.location.href = window.location.protocol + '//' + window.location.host + '/menu';
      // document.getElementById("btnmenu").style.display = "block";
    }, 5000); 
  }
}

//##############################################################################
let esperaranimacion = false
//Animation
function limitesup(ubicacion, paso, limite, esperaranim){
  let data = 0
  if(!esperaranim){
    if (parseFloat(ubicacion) <= limite){
      data = parseFloat(paso)
    }else{
      data = 0
    }
  }
  return data
}

function limiteinf(ubicacion, paso, limite, esperaranim){
  let data = 0
  if(!esperaranim){
    if (parseFloat(ubicacion) >= limite){
      data = parseFloat(paso)
    }else{
      data = 0
    }
  }
  return data
}

//##############################################################################

//Bandera  iniciales
let velocidad = 1
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
let maximonumerodelanzamientos = funcionnumerodelanzamientos(cardnumber);
let numerodelanzamientos2 = 0
let banderlanzamiento = true;
let alternar = false;

//camara
let caminiz = camera.position.z
let caminiy = camera.position.y


// Función de animación se activa cada segundo
function animate() {

  //Esperar a que cargen todos las cartas 3D
  let objetoscargados = true;
  for (let i = 0; i < cardnumber ; i++) {
    if (objects[i]){
      // objetoscargados = true;
    }else{
      objetoscargados = false;
    }
  }

  //render inicial
  if(objetoscargados){
    
    if (flagstart){
      // Asignar posiciones en función del número de cartas
      let numerodecartas2 = parseInt(cardnumber)
      let contz = 0
      const ajustey = numerodecartas2 === 9 ? -2.2 : numerodecartas2 === 15 ? 0.5 : 0;
      for (let i = 0; i < numerodecartas2; i++) {
        console.log("numerodecartas2", numerodecartas2)
        if (numerodecartas2 <= 15){
          // Ciclo de -3, 0, 3 para position.x
          objects[i].position.x = (i % 3 === 0) ? -3 : (i % 3 === 1) ? 0 : 3;

          // Calcular posicion Y 
          let fila = Math.floor(i / 3); // Determina en qué fila estamos
          objects[i].position.y = 6 -1- (fila * 2.7) + ajustey; // Cada fila se mueve 4 unidades hacia abajo

          //Calcular posicion Z
          objects[i].position.z += contz
          //aumenta contador z
          contz += 0.05
        }else if (numerodecartas2 == 21){
          objects[i].position.x = (i % 5 === 0) ? -6 : 
                        (i % 5 === 1) ? -3 : 
                        (i % 5 === 2) ? 0 : 
                        (i % 5 === 3) ? 3 : 6;
          // Calcular posicion Y 
          let fila = Math.floor(i / 5); // Determina en qué fila estamos
          objects[i].position.y = 6 -1- (fila * 2.7) + ajustey; // Cada fila se mueve 4 unidades hacia abajo
          //Calcular posicion Z
          objects[i].position.z += contz
          //aumenta contador z
          contz += 0.05
        }else if (numerodecartas2 == 27){
          objects[i].position.x = (i % 7 === 0) ? -9 : 
                        (i % 7 === 1) ? -6 : 
                        (i % 7 === 2) ? -3 : 
                        (i % 7 === 3) ? 0 : 
                        (i % 7 === 4) ? 3 : 
                        (i % 7 === 5) ? 6 : 9;

          // Calcular posición Y
          let fila = Math.floor(i / 7);
          objects[i].position.y = 6 -1- (fila * 2.7) + ajustey; // Cada fila se mueve 4 unidades hacia abajo
          //Calcular posicion Z
          objects[i].position.z += contz
          //aumenta contador z
          contz += 0.05
        }else if (numerodecartas2 == 33 || numerodecartas2 == 39){
          objects[i].position.x = (i % 7 === 0) ? -9 : 
                        (i % 7 === 1) ? -6 : 
                        (i % 7 === 2) ? -3 : 
                        (i % 7 === 3) ? 0 : 
                        (i % 7 === 4) ? 3 : 
                        (i % 7 === 5) ? 6 : 9;

          // Calcular posición Y
          let fila = Math.floor(i / 7);
          objects[i].position.y = 6 -1- (fila * 2.7) + ajustey; // Cada fila se mueve 4 unidades hacia abajo
          //Calcular posicion Z
          objects[i].position.z += contz
          //aumenta contador z
          contz += 0.05
        }else{
          objects[i].position.x = (i % 7 === 0) ? -9 : 
                        (i % 7 === 1) ? -6 : 
                        (i % 7 === 2) ? -3 : 
                        (i % 7 === 3) ? 0 : 
                        (i % 7 === 4) ? 3 : 
                        (i % 7 === 5) ? 6 : 9;

          // Calcular posición Y
          let fila = Math.floor(i / 7);
          objects[i].position.y = 6 -1- (fila * 2.7) + ajustey; // Cada fila se mueve 4 unidades hacia abajo
          //Calcular posicion Z
          objects[i].position.z += contz
          //aumenta contador z
          contz += 0.05
        }

        renderer.render(scene, camera);
      }
      
      flagstart = false;

      document.getElementById("title").innerHTML = "Presiona Enter.";
    }
  }
  

//Three js
  requestAnimationFrame(animate);

 
  
//##############################################################################
//[EMPEZAR]
  if(objetoscargados){
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

          //mover posiciones
          for (let i = 0; i < cardnumber ; i++) {
            //mover hacia la arriva
            objects[i].position.y= 6
            //mover hacia la derecha
            objects[i].position.x=-8
          }

          
          console.log("ENTER alternar",alternar,"fase1", fase1, "fase2", fase2 ,"fase3", fase3,"fase4", fase4,"fase5", fase5)

          setTimeout(() => {
            if (alternar == false){
              document.getElementById("title").innerHTML = "Precione la tecla i";
              if (fase4){
                document.getElementById("title").innerHTML = "Precione la tecla L";
              }
            }
            if (alternar == true && fase4 == true){
              document.getElementById("title").innerHTML = "Precione la tecla M";
            }
          },200)

          //Banderas
          fase1 = true;
          
        },2000*velocidad);
      }
    }
    
//##############################################################################
    if (keyListener.isPressed(keyCode.KEYI)){
      console.log("estado fase1",fase1)
      console.log("numerodelanzamientos2",numerodelanzamientos2, "maximo", maximonumerodelanzamientos)
      if (numerodelanzamientos2 >= maximonumerodelanzamientos){
        //Ejecutar funcion Final
        final()
      }else{
      
        if (fase1 == true && fase2 == false && numerodelanzamientos2 < maximonumerodelanzamientos){
          //Repartir cartas
          let repartir = setInterval(() => {
            let numerodecartas = parseInt(cardnumber)
            let cont = 0
            let conty = numerodecartas === 21 ? -6: numerodecartas === 33 ? -8: numerodecartas === 39 ? -12: -3
            let contz = 0
            let ajustey = numerodecartas === 9 ? 2 : numerodecartas === 15 ? 1 :numerodecartas === 21 ? 0.5: numerodecartas === 27 ? 0.1: numerodecartas === 33 ? 0.25: numerodecartas === 39 ? 0.25: 0;
            console.log("conty",conty,"ajustey",ajustey)
            //camara
            let zoom = numerodecartas === 21 ? 8: numerodecartas === 27 ? 8 :numerodecartas === 33 ? 9: numerodecartas === 39 ? 10: caminiz;
            let camy = numerodecartas === 21 ? -3.5: numerodecartas === 27 ? -1: numerodecartas === 33 ? -4.5:numerodecartas === 39 ? -5.5: 0;
            camera.position.z = zoom;
            camera.position.y = caminiy + camy;
            //ordenar cartas
            for (let i = 0; i < cardnumber ; i++) {
              cont += 1
              //obtener carta
              let carta = objects[i]
              //Voltear cartas
              if(parseFloat(carta.rotation.y) >= 0){
                carta.rotation.y -= 0.1 
              }
              //Crear Grupos de Cartas
              if (cont == 1){
                carta.position.x += limitesup(carta.position.x,0.04,-3,esperaranimacion)
                addgrupocard1(carta)
              }
              if (cont == 2){
                carta.position.x += limitesup(carta.position.x,0.08,0,esperaranimacion)
                addgrupocard2(carta)
              }
              if (cont == 3){
                carta.position.x += limitesup(carta.position.x,0.12,3,esperaranimacion)
                addgrupocard3(carta)
              }
              //Posicion Y y Z
              carta.position.y -= limiteinf(carta.position.y,0.1,conty,esperaranimacion) 
              carta.position.z = contz
              //ciclos de 3
              if (cont >= 3){ cont = 0; conty += 0.75 + ajustey ; contz -= 0.3}
            }
            
            
            //Render
            renderer.render(scene, camera);
          }, 1000/60)
          //Detiene en tiempo determinado
          setTimeout(() => {
            clearInterval(repartir);
            
            setTimeout(() => {
              document.getElementById("title").innerHTML = "En que grupo esta? 1, 2, 3";
            },100)
            
            console.log("Grupo1",grupocard1)
            console.log("Grupo2",grupocard2)
            console.log("Grupo3",grupocard3)
            console.log("Orden Varaja",ordenvaraja)
            // Incrementa numerodelanzamientos con retardo
            setTimeout(() => {
              console.log("Inumerodelanzamientos2", numerodelanzamientos2, "max", maximonumerodelanzamientos, "banderlanzamiento", banderlanzamiento)
              if (numerodelanzamientos2 < maximonumerodelanzamientos && banderlanzamiento) {
                numerodelanzamientos2 += 1;
                console.log("INúmero de lanzamientos2:", numerodelanzamientos2);
                banderlanzamiento= false; // Desactiva la bandera después del incremento
              }
            },100);
            
            console.log("I alternar",alternar,"fase1", fase1, "fase2", fase2 ,"fase3", fase3,"fase4", fase4,"fase5", fase5)
            //Banderas
            fase2 = true
            fase3 = true
            fase4 = false
            alternar = true
          },2000*velocidad);
        }
      }
    }
//##############################################################################

    if (keyListener.isPressed(keyCode.ONE)){
      console.log("fase1",fase1,"fase2",fase2,"fase3",fase3, "fase 4", fase4)
      if (fase1 == true && fase2 == true && fase3 == true && fase4 == false && fase5 == false ) {
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
          let ultimacarta2 = objects[grupocard1[grupocard1.length-1]]
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
          setTimeout(() => {
            document.getElementById("title").innerHTML = "..Presione Enter";
          },100)
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
          console.log("Orden Varaja",ordenvaraja)
          //Limpiar grupos
          grupocard1 = []
          grupocard2 = []
          grupocard3 = []
        },1000);
      }
    }

//##############################################################################
    if (keyListener.isPressed(keyCode.TWO)){
      console.log("fase1",fase1,"fase2",fase2,"fase3",fase3, "fase 4", fase4)
      if (fase1 == true && fase2 == true && fase3 == true && fase4 == false && fase5 == false ) {
        //Repartir cartas
        let agrupar = setInterval(() => {
          let contx = 0
          let conty = 0
          let contz = 0
          //[APILAR CARTAS GRUPO INFERIOR]
          for (let i = 0; i < grupocard1.length ; i++) {
            //mover hacie el centro
            let carta = objects[grupocard1[i]]
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
          let ultimacarta = objects[grupocard1[grupocard1.length-1]]
          contx = ultimacarta.position.x + 0.1
          conty = ultimacarta.position.y + 1
          contz = ultimacarta.position.z + 0.1
          for (let i = 0; i < grupocard2.length ; i++) {
            //mover hacie el centro
            let carta = objects[grupocard2[i]]
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
          let ultimacarta2 = objects[grupocard2[grupocard2.length-1]]
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
          setTimeout(() => {
            document.getElementById("title").innerHTML = "..Presione Enter";
          },100)
          fase4 = true
          fase1 = false
          //Almacenar orden varaja
          let cont = 0
          //grupo inferior
          for (let i = 0; i < grupocard1.length ; i++) {
            ordenvaraja[cont] = grupocard1[i]
            cont +=1
          }
          //grupo medio
          for (let i = 0; i < grupocard2.length ; i++) {
            ordenvaraja[cont] = grupocard2[i]
            cont +=1
          }
          //grupo superior
          for (let i = 0; i < grupocard3.length ; i++) {
            ordenvaraja[cont] = grupocard3[i]
            cont +=1
          }
          console.log("Orden Varaja",ordenvaraja)
          //Limpiar grupos
          grupocard1 = []
          grupocard2 = []
          grupocard3 = []
        },1000);
      }
    }


//##############################################################################
    if (keyListener.isPressed(keyCode.THREE)) {
      console.log("fase1",fase1,"fase2",fase2,"fase3",fase3, "fase 4", fase4)
      if (fase1 == true && fase2 == true && fase3 == true && fase4 == false && fase5 == false ) {
        //Repartir cartas
        let agrupar = setInterval(() => {
          let contx = 0
          let conty = 0
          let contz = 0
          //[APILAR CARTAS GRUPO INFERIOR]
          for (let i = 0; i < grupocard1.length ; i++) {
            //mover hacie el centro
            let carta = objects[grupocard1[i]]
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
          let ultimacarta = objects[grupocard1[grupocard1.length-1]]
          contx = ultimacarta.position.x + 0.1
          conty = ultimacarta.position.y + 1
          contz = ultimacarta.position.z + 0.1
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
          //[APILAR CARTAS GRUPO SUPERIOR]
          //obteniendo ultima posicion para empezar
          let ultimacarta2 = objects[grupocard3[grupocard3.length-1]]
          contx = ultimacarta2.position.x + 0.1
          conty = ultimacarta2.position.y + 1
          contz = ultimacarta2.position.z + 0.1
          for (let i = 0; i < grupocard2.length ; i++) {
            //mover hacie el centro
            let carta = objects[grupocard2[i]]
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
          setTimeout(() => {
            document.getElementById("title").innerHTML = "..Presione Enter";
          },100)
          fase4 = true
          fase1 = false
          //Almacenar orden varaja
          let cont = 0
          //grupo inferior
          for (let i = 0; i < grupocard1.length ; i++) {
            ordenvaraja[cont] = grupocard1[i]
            cont +=1
          }
          //grupo medio
          for (let i = 0; i < grupocard3.length ; i++) {
            ordenvaraja[cont] = grupocard3[i]
            cont +=1
          }
          //grupo superior
          for (let i = 0; i < grupocard2.length ; i++) {
            ordenvaraja[cont] = grupocard2[i]
            cont +=1
          }
          console.log("Orden Varaja",ordenvaraja)
          //Limpiar grupos
          grupocard1 = []
          grupocard2 = []
          grupocard3 = []
        },1000);
      }
    }

//##############################################################################
    if (keyListener.isPressed(keyCode.LETTERM)){
      console.log("numerodelanzamientos2",numerodelanzamientos2, "maximo", maximonumerodelanzamientos)
      if (numerodelanzamientos2 >= maximonumerodelanzamientos){
        //Ejecutar funcion Final
        final()
      }else{
        console.log("fase1",fase1,"fase2",fase2,"fase3",fase3, "fase 4", fase4, "fase5",fase5)
        if (fase1 == true && fase2 == true && fase3 == true && fase4 == true && fase5 == false && numerodelanzamientos2 < maximonumerodelanzamientos){
            //Repartir cartas
            let creargrupos = setInterval(() => {
            let numerodecartas = parseInt(cardnumber)
            let cont = 0
            let conty = numerodecartas === 21 ? -6:numerodecartas === 33 ? -8: numerodecartas === 39 ? -12: -3
            let contz = 0
            let ajustey = numerodecartas === 9 ? 2 : numerodecartas === 15 ? 1 : numerodecartas === 21 ? 0.5: numerodecartas === 27 ? 0.1:  numerodecartas === 39 ? -0.05:0;
            //camara
            let camy = numerodecartas === 21 ? 2: numerodecartas === 27 ? -0.5: numerodecartas === 33 ? 4: numerodecartas === 39 ? 6: 0;
            camera.position.y = caminiy - camy;
            console.log("caminiy", caminiy, "camy", camy, "total", caminiy - camy)
            //cartas
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
              if (cont >= 3){ cont = 0; conty += 1 + ajustey; contz -= 0.3}
            }
            
            renderer.render(scene, camera);
          }, 1000/60)
          //Detiene en tiempo determinado
          setTimeout(() => {
            clearInterval(creargrupos);
            setTimeout(() => {
              document.getElementById("title").innerHTML = "2| En que grupo esta? 1,2,3";
            },100)
            fase6 = true
            console.log(grupocard1, grupocard2, grupocard3)
            //Reiniciar banderas
            fase1 = true 
            fase2 = true 
            fase3 = true
            fase4 = false
            fase5 = false
            alternar = false
            // Incrementa numerodelanzamientos con retardo
            setTimeout(() => {
              console.log("Mnumerodelanzamientos2", numerodelanzamientos2, "max", maximonumerodelanzamientos, "banderlanzamiento", banderlanzamiento)
              if (numerodelanzamientos2 < maximonumerodelanzamientos && !banderlanzamiento) {
                numerodelanzamientos2 += 1;
                console.log("MNúmero de lanzamientos2:", numerodelanzamientos2);
                banderlanzamiento= true; // Desactiva la bandera después del incremento
              }
            },100);
            console.log("M alternar",alternar,"fase1", fase1, "fase2", fase2 ,"fase3", fase3,"fase4", fase4,"fase5", fase5)
          },2000*velocidad);

        }
      }
    }
//##############################################################################
    if (keyListener.isPressed(keyCode.LETTERL)){
      console.log("numerodelanzamientos2",numerodelanzamientos2, "maximo", maximonumerodelanzamientos)
      if (numerodelanzamientos2 >= maximonumerodelanzamientos){
        //Ejecutar funcion Final
        final()
      }else{
        console.log("fase1",fase1,"fase2",fase2,"fase3",fase3, "fase 4", fase4, "fase5",fase5)
        if (fase1 == true && fase2 == true && fase3 == true && fase4 == true && fase5 == false && numerodelanzamientos2 < maximonumerodelanzamientos){
            //Repartir cartas
            let creargrupos = setInterval(() => {
            let numerodecartas = parseInt(cardnumber)
            let cont = 0
            let conty = numerodecartas === 21 ? -6: numerodecartas === 33 ? -8: -3
            let contz = 0
            let ajustey = numerodecartas === 9 ? 2 : numerodecartas === 15 ? 1 : numerodecartas === 21 ? 0.5: numerodecartas === 33 ? 0.1: 0;
            //camara
            let camy = numerodecartas === 21 ? -2: numerodecartas === 27 ? -0.5: numerodecartas === 33 ? -3.5: numerodecartas === 39 ? 4: 0;
            camera.position.y = caminiy + camy;
            //cartas
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
              if (cont >= 3){ cont = 0; conty += 1 + ajustey ; contz -= 0.3}
            }
            
            renderer.render(scene, camera);
          }, 1000/60)
          //Detiene en tiempo determinado
          setTimeout(() => {
            clearInterval(creargrupos);
            setTimeout(() => {
              document.getElementById("title").innerHTML = "2| En que grupo esta? 1,2,3";
            },100)
            fase6 = true
            console.log(grupocard1, grupocard2, grupocard3)
            //Reiniciar banderas
            fase1 = true 
            fase2 = true 
            fase3 = true
            fase4 = false
            fase5 = false
            alternar = true
            // Incrementa numerodelanzamientos con retardo
            setTimeout(() => {
              console.log("L2numerodelanzamientos2", numerodelanzamientos2, "max", maximonumerodelanzamientos, "banderlanzamiento", banderlanzamiento)
              if (numerodelanzamientos2 < maximonumerodelanzamientos && banderlanzamiento) {
                numerodelanzamientos2 += 1;
                console.log("L2.1Número de lanzamientos2:", numerodelanzamientos2);
                banderlanzamiento= false; // Desactiva la bandera después del incremento
              }
            },100);
            console.log("L alternar",alternar,"fase1", fase1, "fase2", fase2 ,"fase3", fase3,"fase4", fase4,"fase5", fase5)
          },2000*velocidad);

        }
      }
    }

  }
}


// Añadir el listener para redimensionar la ventana
addResizeListener(camera, renderer);

// Iniciar la animación
animate();

//iniciar
keyListener.start()
