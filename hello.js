window.addEventListener("DOMContentLoaded", function () {
  // Get the canvas element
  const canvas = document.getElementById("renderCanvas");

  // Create the Babylon.js engine
  const engine = new BABYLON.Engine(canvas, true);

  // Create the scene
  const createScene = function () {
    const scene = new BABYLON.Scene(engine);

    // Create a camera and position it
    const camera = new BABYLON.ArcRotateCamera(
      "camera",
      Math.PI / 2,
      Math.PI / 4,
      4,
      BABYLON.Vector3.Zero(),
      scene
    );
    camera.attachControl(canvas, true);

    // Add a light
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
    light.intensity = 0.8;

    // Add a sphere
    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);

    // Simple rotation animation
    scene.onBeforeRenderObservable.add(() => {
      sphere.rotation.y += 0.01;
    });

    return scene;
  };

  const scene = createScene();

  // Render loop
  engine.runRenderLoop(function () {
    scene.render();
  });

  // Resize the engine on window resize
  window.addEventListener("resize", function () {
    engine.resize();
  });
});
