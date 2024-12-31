window.addEventListener("DOMContentLoaded", function() {
    // Grundlegende Babylon.js-Einstellungen
    const canvas = document.getElementById("renderCanvas");
    const engine = new BABYLON.Engine(canvas, true);

    // Szene erstellen
    const createScene = function() {
        const scene = new BABYLON.Scene(engine);

        // Kamera erstellen
        const camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
        camera.setPosition(new BABYLON.Vector3(0, 5, -10));
        camera.attachControl(canvas, true);

        // Licht erstellen
        const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        // Kugel erstellen
        const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);

        return scene;
    };

    const scene = createScene();

    // Render-Schleife
    engine.runRenderLoop(function() {
        scene.render();
    });

    // Fenstergröße ändern
    window.addEventListener("resize", function() {
        engine.resize();
    });
});
