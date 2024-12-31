<!DOCTYPE html>
<html>
<head>
    <title>Babylon.js mit Achsenpfeilen</title>
    <style>
        canvas {
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body>
    <canvas id="renderCanvas"></canvas>
    <script src="https://cdn.babylonjs.com/babylon.js"></script>
    <script>
        var canvas = document.getElementById("renderCanvas");
        var engine = new BABYLON.Engine(canvas, true);
        var scene = new BABYLON.Scene(engine);

        // Kamera und Licht erstellen
        var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 3, 100, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

        // Achsenpfeile anzeigen
        var axesViewer = new BABYLON.AxesViewer(scene, 10);

        // Flachen Boden erstellen und nach unten verschieben
        var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 100, height: 100}, scene);
        var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
        groundMaterial.diffuseTexture = new BABYLON.Texture("path/to/your/grass_texture.png", scene);
        ground.material = groundMaterial;
        ground.position.y = -5;  // Verschiebe den Boden nach unten

        // Hintergrundbild hinzufügen
        var backgroundMaterial = new BABYLON.BackgroundMaterial("backgroundMaterial", scene);
        backgroundMaterial.diffuseTexture = new BABYLON.Texture("path/to/your/himmel.jpg", scene);
        var backgroundPlane = BABYLON.MeshBuilder.CreatePlane("backgroundPlane", {width: 1000, height: 800}, scene);
        backgroundPlane.material = backgroundMaterial;
        backgroundPlane.position.z = -50;

        engine.runRenderLoop(function () {
            scene.render();
        });

        window.addEventListener("resize", function () {
            engine.resize();
        });
    </script>
</body>
</html>
