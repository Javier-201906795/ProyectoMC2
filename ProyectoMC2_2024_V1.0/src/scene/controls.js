import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";

export function addControls(camera, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement);
  return controls;
}
