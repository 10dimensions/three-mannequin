import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

var scene;
var camera;
var renderer;
var controls;

export const initializeScene = () => {
    // === THREE.JS CODE START ===
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true

    camera.position.y = 0.2;
    camera.position.z = 28;

    controls = new OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true
    controls.minDistance = 5
    controls.maxDistance = 150
    controls.enablePan = false
    controls.maxPolarAngle = Math.PI / 2 - 0.05
    controls.update();

    document.body.appendChild( renderer.domElement );

    var animate = function () {
        requestAnimationFrame( animate );
        controls.update();
        //cube.rotation.x += 0.01;
        //cube.rotation.y += 0.01;
        renderer.render( scene, camera );
    };
    animate();
}

export const setupLights = () => {
    scene.add(new THREE.AmbientLight(0xffffff, 0.4))

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.4)
    dirLight.position.set(- 60, 100, - 10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 50;
    dirLight.shadow.camera.bottom = - 50;
    dirLight.shadow.camera.left = - 50;
    dirLight.shadow.camera.right = 50;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 200;
    dirLight.shadow.mapSize.width = 4096;
    dirLight.shadow.mapSize.height = 4096;
    scene.add(dirLight);
    // scene.add( new THREE.CameraHelper(dirLight.shadow.camera))
}

export const glbLoader = (path, scale = 1) => {
    // Instantiate a loader
    const loader = new GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderConfig({ type: 'js' });
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    //dracoLoader.setDecoderPath( 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/' );
    loader.setDRACOLoader( dracoLoader );

    // Load a glTF resource
    loader.load(
        // resource URL
        path,
        // called when the resource is loaded
        function ( gltf ) {

            scene.add( gltf.scene );

            gltf.scene.scale.set(scale, scale, scale);

            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object

        },
        // called while loading is progressing
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( error );
        }
    );
}