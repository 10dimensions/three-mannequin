import "./styles.css";
import React, { useEffect, useState } from "react";
import * as THREE from "three";

import { initializeScene } from "./scene"

export default function App() {

  const [render, setRender] = useState(false);

  useEffect(()=>{
    if(render) return;
    initializeScene();
    setRender(true);
  }, []);
  
  return (
    <div className="App" />
  );
}

