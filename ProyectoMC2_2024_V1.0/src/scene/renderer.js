import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";

export function createRenderer() {
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  return renderer;
}
