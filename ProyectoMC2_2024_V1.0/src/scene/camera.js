import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";

export function createCamera() {
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  return camera;
}
