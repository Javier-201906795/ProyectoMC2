import * as THREE from 'three';

const geometry = new THREE.PlaneGeometry( 200, 200, 200 );
const material = new THREE.MeshBasicMaterial( { color: 0x005C53 } );
//const material = new THREE.MeshStandardMaterial( { color: 0x005C53 } );
const plane = new THREE.Mesh( geometry, material );

plane.position.set(0,0,-5)

export default plane;