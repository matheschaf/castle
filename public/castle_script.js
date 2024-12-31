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
    camera.setPosition(new BABYLON.Vector3(60, 0, 10));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.9;
    const box = BABYLON.MeshBuilder.CreateBox("box", { size: 1 }, scene);
    box.position.y = -20;
    var axesViewer = new BABYLON.AxesViewer(scene, 5);
    //create ground
    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "textures/heightMap_orig.png", 1000, 1000, 1000, -10, 30, scene, false);
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("textures/ground.jpg", scene);
    groundMaterial.diffuseTexture.uScale = 10;
    groundMaterial.diffuseTexture.vScale = 10;
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    ground.position.y = -20;
    ground.material = groundMaterial;
    // Skybox erstellen'*/
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

    document.addEventListener('DOMContentLoaded', function() {
        var button1 = document.getElementById('button1');
        var button2 = document.getElementById('button2');
        var button3 = document.getElementById('button3');
    
        button1.addEventListener('click', function() {
            debu('Button 1 wurde geklickt!');
        });
    
        button2.addEventListener('click', function() {
            debu('Button 2 wurde geklickt!');
        });
    
        button3.addEventListener('click', function() {
            debu('Button 3 wurde geklickt!');
        });
    });