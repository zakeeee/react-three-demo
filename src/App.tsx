import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './App.less';

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasEl.clientWidth / canvasEl.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasEl,
    });
    renderer.setSize(canvasEl.clientWidth, canvasEl.clientHeight);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    }

    animate();
  }, []);

  return (
    <div className="App">
      <canvas className="canvas" ref={canvasRef}></canvas>
    </div>
  );
};

export default App;
