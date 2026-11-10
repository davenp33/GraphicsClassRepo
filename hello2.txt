window.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("renderCanvas");
  const engine = new BABYLON.Engine(canvas, true);

  const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.1, 0.1, 0.1); // dark gray background

    // Camera setup
    const camera = new BABYLON.ArcRotateCamera(
      "camera",
      Math.PI / 2,
      Math.PI / 3,
      6,
      BABYLON.Vector3.Zero(),
      scene
    );
    camera.attachControl(canvas, true); // mouse controls enabled

    // Light
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
    light.intensity = 0.9;

    // Sphere
    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);
    sphere.position.y = 1;

    // Ground with texture
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);
    const groundMaterial = new BABYLON.StandardMaterial("groundMat", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/grass.jpg", scene);
    ground.material = groundMaterial;

    // Simple animation
    scene.onBeforeRenderObservable.add(() => {
      sphere.rotation.y += 0.01;
    });

    return scene;
  };

  const scene = createScene();

  engine.runRenderLoop(function () {
    scene.render();
  });

  window.addEventListener("resize", function () {
    engine.resize();
  });
});
