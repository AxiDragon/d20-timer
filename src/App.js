import Timer from './components/Timer';
import TaskList from './components/TaskList';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function App() {
  return (
    <div className="App">
      <div>
        <Canvas>
          <ambientLight intensity={25} />
          <pointLight position={[2, 1, 1]} intensity={25} />
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

  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.color.set('#ff5555');
    }
  });

  return <primitive object={scene} />;
}

export default App;
