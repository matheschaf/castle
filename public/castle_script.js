function debu(inp){console.log(inp);}

var canvas = document.getElementById("renderCanvas");
var startRenderLoop = function (engine, canvas) {
        engine.runRenderLoop(function () {
            if (sceneToRender && sceneToRender.activeCamera) {
                sceneToRender.render();
            }
        });
}
var engine = null;
    var scene = null;
    var sceneToRender = null;
    var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
    var delayCreateScene = function () {
    var scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
    camera.setPosition(new BABYLON.Vector3(0, 5, -10));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.9;
    const box = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, scene);
    // Erzeuge eine dynamische Textur für die Heightmap
    var textureResolution = 512;
    var dynamicTexture = new BABYLON.DynamicTexture("dynamicTexture", textureResolution, scene, false);
    var context = dynamicTexture.getContext();

    // Zeichne die Heightmap
    for (var i = 0; i < textureResolution; i++) {
        for (var j = 0; j < textureResolution; j++) {
            var heightValue = Math.sin(i / 20) * Math.cos(j / 20) * 128 + 128;  // Beispiel für Höhenwerte
            var grayValue = heightValue.toFixed(0);
            context.fillStyle = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
            context.fillRect(i, j, 1, 1);
        }
    }
    dynamicTexture.update();
    // Boden erstellen
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 100, height: 100}, scene);

    // Textur hinzufügen
    var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("grasstex.png", scene);
    ground.material = groundMaterial;

     // Skybox erstellen
     var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size: 1000}, scene);
     var skyboxMaterial = new BABYLON.StandardMaterial("skyBoxMaterial", scene);
     skyboxMaterial.backFaceCulling = false;
     skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/misky", scene);
     skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
     skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
     skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
     skybox.material = skyboxMaterial;

    
     
    return scene;

    }//ende deled scene
    window.initFunction = async function() {
        var asyncEngineCreation = async function() {
            try {
                return createDefaultEngine();
                } catch(e) {
                    console.log("the available createEngine function failed. Creating the default engine instead");
                        return createDefaultEngine();
                    }
            }

            window.engine = await asyncEngineCreation();
            if (!engine) throw 'engine should not be null.';
            startRenderLoop(engine, canvas);
            
        window.scene = delayCreateScene();
    }
        
    initFunction().then(() => {sceneToRender = scene});
    window.addEventListener("resize", function () {engine.resize();});
//----------------------------------------------------------------------------------ende babylon--------------------------------------------------------------
    const toggleButton = document.getElementById("toggleButton");
    const toggleSectionContainer = document.getElementById("toggleSectionContainer");
    $("#toggleButton").click(function() { $("#toggleSectionContainer").fadeToggle("slow"); });