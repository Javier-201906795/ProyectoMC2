import * as THREE from 'three';

import scene from './basic/Scene.js';
import camera from './basic/Camera.js';
import renderer from './basic/Render.js';
import cube from './shapes/Cube.js';
import light from './basic/Ligth.js';
import directionalLight from './basic/DirectionLigth.js';


console.log(scene, camera, renderer, cube);

scene.add( cube );
scene.add( light );
scene.add( directionalLight );

camera.position.set(2,2,2)
camera.lookAt(cube.position)

//take picture
//renderer.render( scene, camera );

//Grira
setInterval(() => {
	cube.rotation.y += 0.01
	renderer.render( scene, camera );
}, 1000/60);




