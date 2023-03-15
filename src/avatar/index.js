import { KeyDisplay } from './utils';
import { CharacterControls } from './controller';
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


// MODEL WITH ANIMATIONS
var characterControls;

// CONTROL KEYS
const keysPressed = {  }
//const keyDisplayQueue = new KeyDisplay();

const clock = new THREE.Clock();

export const loadAvatar = (path, scene) => {
    new GLTFLoader().load(path, function (gltf) {
        const model = gltf.scene;
        model.traverse(function (object) {
            if (object.isMesh) object.castShadow = true;
        });
        scene.add(model);

        const gltfAnimations = gltf.animations;
        const mixer = new THREE.AnimationMixer(model);
        const animationsMap = new Map()
        gltfAnimations.filter(a => a.name != 'TPose').forEach((a) => {
            animationsMap.set(a.name, mixer.clipAction(a))
        })

        characterControls = new CharacterControls(model, mixer, animationsMap, orbitControls, camera,  'Idle')
    });


    document.addEventListener('keydown', (event) => {
        //keyDisplayQueue.down(event.key)
        if (event.shiftKey && characterControls) {
            characterControls.switchRunToggle()
        } else {
            keysPressed[event.key.toLowerCase()] = true
        }
    }, false);

    document.addEventListener('keyup', (event) => {
        //keyDisplayQueue.up(event.key);
        keysPressed[event.key.toLowerCase()] = false
    }, false);
}


export { clock, keysPressed, characterControls};