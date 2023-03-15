import "./styles.css";
import React, { useEffect, useState } from "react";
import * as THREE from "three";

import { initializeScene, setupLights, glbLoader } from "./scene"

export default function App() {

  const [render, setRender] = useState(false);

  useEffect(()=>{
    if(render) return;
    initializeScene();
    setupLights();
    glbLoader('./assets/environment/scene.glb', 100);
    glbLoader('./assets/props/mennequin.glb', 1);
    setRender(true);
  }, []);
  
  return (
    <div className="App" />
  );
}

