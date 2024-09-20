import Timer from './components/Timer';
import TaskList from './components/TaskList';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { createNoise3D } from 'simplex-noise';
import * as THREE from 'three';

const noise = createNoise3D();

function App() {
  return (
    <div className="App">
      <div>
        <Canvas>
          <ambientLight intensity={5} />
          <D20 />
          <OrbitControls />
        </Canvas>
      </div>
      <Timer />
      <TaskList />
    </div>
  );
}

function D20() {
  const { scene } = useGLTF('/assets/models/d20.glb', true);
  const ref = useRef();

  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.flatShading = true;
      child.material.lights = false;
      child.material.needsUpdate = true;
    }
  });

  useFrame(({ clock }) => {
    if (ref.current) {
      const time = clock.getElapsedTime() / 25;
      ref.current.rotation.x = noise(time, 0, 0) * Math.PI;
      ref.current.rotation.y = noise(0, time, 0) * Math.PI;
      ref.current.rotation.z = noise(0, 0, time) * Math.PI;
    }
  });

  return <primitive ref={ref} object={scene} />;
}

export default App;
