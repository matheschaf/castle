<!DOCTYPE html>
<html>
<head>
    <title>Babylon.js mit Touchscreen-Unterstützung</title>
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

        // Hindernis erstellen (z.B. eine Box)
        var box = BABYLON.MeshBuilder.CreateBox("box", {size: 5}, scene);
        box.position = new BABYLON.Vector3(0, 2.5, 0);

        // Event Listener für Touch- und Zeigegeräte-Eingaben
        canvas.addEventListener("pointerdown", handlePointerEvent);
        canvas.addEventListener("pointermove", handlePointerEvent);
        canvas.addEventListener("pointerup", handlePointerEvent);

        function handlePointerEvent(evt) {
            var pickResult = scene.pick(scene.pointerX, scene.pointerY);

            if (pickResult.hit) {
                console.log("Treffer: " + pickResult.pickedMesh.name);
                // Hier kannst du weitere Aktionen ausführen, wenn der Zeiger auf ein Hindernis trifft
            }
        }

        engine.runRenderLoop(function () {
            scene.render();
        });

        window.addEventListener("resize", function () {
            engine.resize();
        });
    </script>
</body>
</html>
