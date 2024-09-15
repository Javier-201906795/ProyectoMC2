import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";

export function addLights(scene, objToRender) {
  const topLight = new THREE.DirectionalLight(0xffffff, 1);
  topLight.position.set(500, 500, 500);
  topLight.castShadow = true;
  scene.add(topLight);

  const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "dino" ? 5 : 1);
  scene.add(ambientLight);
}
