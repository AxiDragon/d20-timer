import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { createNoise3D } from 'simplex-noise';
import * as THREE from 'three';
import styles from './d20.module.css';

const noise = createNoise3D();

function D20() {
	return (
		<div className={styles.d20}>
			<Canvas camera={{ position: [0, 0, 10], fov: 25 }}>
				<ambientLight intensity={5} />
				<Model />
			</Canvas>
		</div>
	);
};

function Model() {
	const { scene } = useGLTF('/assets/models/d20.glb', true);
	const ref = useRef();
	const { gl, scene: mainScene, camera } = useThree();
	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2();

	useEffect(() => {
		const handleMouseClick = (event) => {
			const bounds = gl.domElement.getBoundingClientRect();
			mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
			mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

			raycaster.setFromCamera(mouse, camera);

			const intersects = raycaster.intersectObjects(mainScene.children, true);

			if (intersects.length > 0) {
				console.log('clicked on ' + intersects[0].object.name);
			}
		};

		window.addEventListener('click', handleMouseClick);

		return () => {
			window.removeEventListener('click', handleMouseClick);
		};
	}, [camera, mouse, raycaster]);

	useFrame(({ clock }) => {
		if (ref.current) {
			const time = clock.getElapsedTime() / 25;
			ref.current.rotation.y = 55;
			ref.current.rotation.x = noise(time, 0, 0) * Math.PI;
			ref.current.rotation.y = noise(0, time, 0) * Math.PI;
			ref.current.rotation.z = noise(0, 0, time) * Math.PI;
		}
	});
	return <primitive ref={ref} object={scene} scale={[2, 2, 2]} />;
}

export default D20;