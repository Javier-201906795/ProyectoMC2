import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";

export function addLights(scene) {
  const topLight = new THREE.DirectionalLight(0xffffff, 1.5);
  topLight.position.set(0, 0, 10);
  topLight.castShadow = true;
  scene.add(topLight);

  const ambientLight = new THREE.AmbientLight(0x333333, 1);
  scene.add(ambientLight);
}
