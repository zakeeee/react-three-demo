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

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasEl,
    });
    renderer.setSize(canvasEl.clientWidth, canvasEl.clientHeight);

    const scene = new THREE.Scene();

    const geometry = new THREE.IcosahedronGeometry();
    const texture = new THREE.TextureLoader().load('Shiba-Inu.jpg');
    const material = new THREE.MeshBasicMaterial({
      map: texture,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
    scene.add(line);

    const camera = new THREE.PerspectiveCamera(
      75,
      canvasEl.clientWidth / canvasEl.clientHeight,
      0.1,
      2000
    );
    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);

      mesh.rotateX(0.01);
      mesh.rotateY(0.01);
      edges.rotateX(0.01);
      edges.rotateY(0.01);

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
