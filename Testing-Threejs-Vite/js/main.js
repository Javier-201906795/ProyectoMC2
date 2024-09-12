import * as THREE from 'three';

import scene from './basic/Scene.js';
import camera from './basic/Camera.js';
import renderer from './basic/Render.js';
import cube from './shapes/Cube.js';
import light from './basic/Ligth.js';
import directionalLight from './basic/DirectionLigth.js';
import plane from './shapes/Plane.js';
import loopMachine from './LoopMachine.js';
import keyCode from './cotroller/KeyCode.js'
import keyListener from './cotroller/KeyListener.js';


console.log(scene, camera, renderer, cube);


scene.add(plane);
scene.add( cube );
scene.add( light );
scene.add( directionalLight );

camera.position.set(0,5,8)
camera.lookAt(cube.position)


//Gira con tecla
loopMachine.addCallback(() => {
	if (keyListener.isPressed(keyCode.ENTER)) {
		cube.rotation.y += 0.01
	}
	renderer.render( scene, camera );// take picture
});
//DEBE IR AL FINAL
loopMachine.start()
keyListener.start()

console.log(keyCode, keyListener)