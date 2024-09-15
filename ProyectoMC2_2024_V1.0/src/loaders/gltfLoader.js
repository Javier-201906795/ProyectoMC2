import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

export function loadModel(path, scene, onLoad) {
  const loader = new GLTFLoader();
  loader.load(
    path,
    function (gltf) {
      onLoad(gltf);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
      console.error(error);
    }
  );
}
