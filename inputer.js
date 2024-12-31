<!DOCTYPE html>
<html>
<head>
    <title>Babylon.js Boden mit Hügeln</title>
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
        var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 3, 50, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

        // Erzeuge eine dynamische Textur für die Heightmap
        var textureResolution = 512;
        var dynamicTexture = new BABYLON.DynamicTexture("dynamicTexture", textureResolution, scene, false);
        var context = dynamicTexture.getContext();

        // Zeichne die Heightmap mit Hügeln
        for (var i = 0; i < textureResolution; i++) {
            for (var j = 0; j < textureResolution; j++) {
                var x = i - textureResolution / 2;
                var y = j - textureResolution / 2;
                var heightValue = Math.sin(x * 0.1) * Math.sin(y * 0.1) * 128 + 128;  // Beispiel für Hügel
                var grayValue = heightValue.toFixed(0);
                context.fillStyle = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
                context.fillRect(i, j, 1, 1);
            }
        }
        dynamicTexture.update();

        // Erzeuge das Gelände mit der dynamischen Heightmap
        var ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("ground", dynamicTexture, {
            width: 100,
            height: 100,
            subdivisions: 100,
            minHeight: 0,
            maxHeight: 10,
            onReady: function() {
                var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
                groundMaterial.diffuseTexture = new BABYLON.Texture("path/to/your/grass_texture.png", scene);
                ground.material = groundMaterial;
            }
        }, scene);

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
