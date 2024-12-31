// Event-Listener für DOMContentLoaded
$(document).ready(function() {
    // Namensraum castle
    const castle = {};

    // Grundlegende Babylon.js-Einstellungen
    castle.canvas = $("#renderCanvas")[0];
    castle.engine = new BABYLON.Engine(castle.canvas, true);

    // Szene erstellen
    castle.createScene = function() {
        const scene = new BABYLON.Scene(castle.engine);

        // Kamera erstellen
        const camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
        camera.setPosition(new BABYLON.Vector3(0, 5, -10));
        camera.attachControl(castle.canvas, true);

        // Licht erstellen
        const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        // Kugel erstellen
        const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);

        return scene;
    };

    castle.scene = castle.createScene();

    // Render-Schleife
    castle.engine.runRenderLoop(function() {
        castle.scene.render();
    });

    // Fenstergröße ändern
    $(window).resize(function() {
        castle.engine.resize();
    });

    // Toggle-Funktion mit langsamer Ein- und Ausblendung
    $("#toggleButton").click(function() {
        $("#toggleSectionContainer").fadeToggle("slow");
    });
});
