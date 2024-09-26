import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useGLTF, Text } from '@react-three/drei';
import * as THREE from 'three';
import styles from './css/d20.module.css';

function getRandomVector(length = 1) {
	return new THREE.Vector3(getRandom(), getRandom(), getRandom()).normalize().multiplyScalar(length);
}

function getRandom(amplitude = 1) {
	return (Math.random() * 2 - 1) * amplitude;
}

function D20({ text, onClick }) {
	return (
		<div className={styles.d20}>
			<Canvas camera={{ position: [0, 0, 10], fov: 25 }}>
				<Model text={text} onClick={onClick} />
			</Canvas>
		</div>
	);
};

function Model({ text, onClick }) {
	const { scene } = useGLTF('./assets/d20.glb', true);
	const texture = useLoader(THREE.TextureLoader, './assets/d20.png');

	const ref = useRef();
	const textRef = useRef();
	const hintRef = useRef();

	const baseRotation = new THREE.Vector3(0, 55, 0);
	const rotationOffset = useRef(getRandomVector(0.3));
	const randomDirection = useRef(getRandomVector());
	const baseScale = 1.7;
	const animationSpeed = 15;

	const spinSpeedTarget = useRef(0);
	const scaleTarget = useRef(1);
	const hintScaleTarget = useRef(1);
	const firstClickTime = useRef(-1);
	const lastClickTime = useRef(-1);
	const clickFlag = useRef(false);
	let spinSpeed = 0;

	useEffect(() => {
		texture.minFilter = THREE.NearestFilter;
		texture.magFilter = THREE.NearestFilter;

		if (ref.current) {
			ref.current.traverse((child) => {
				if (child.isMesh) {
					child.material = new THREE.MeshBasicMaterial({ map: texture });
				}
			});
		}
	}, [scene, texture]);

	useFrame(({ clock }, delta) => {
		if (ref.current) {
			if (clickFlag.current) {
				clickFlag.current = false;

				if (firstClickTime.current === -1) {
					firstClickTime.current = clock.getElapsedTime();
				}

				lastClickTime.current = clock.getElapsedTime();

				randomDirection.current = getRandomVector();
				rotationOffset.current = getRandomVector(.1);
			}

			const timeSinceLastClick = clock.getElapsedTime() - lastClickTime.current;

			if (timeSinceLastClick < 15) {
				const t = timeSinceLastClick * animationSpeed;
				spinSpeedTarget.current = Math.sin(Math.sqrt(t)) * Math.pow(2, -t / 2) * 5;

				const s = t * 5;
				scaleTarget.current = Math.sin(s) * Math.pow(2, -s / 2) * 0.5 + baseScale;

				spinSpeed += (spinSpeedTarget.current - spinSpeed) * delta * 100;
				ref.current.scale.x = ref.current.scale.y = ref.current.scale.z = scaleTarget.current;

				const time = clock.getElapsedTime() * spinSpeed;
				ref.current.rotation.x = rotationOffset.current.x + baseRotation.x + randomDirection.current.x * time;
				ref.current.rotation.y = rotationOffset.current.y + baseRotation.y + randomDirection.current.y * time;
				ref.current.rotation.z = rotationOffset.current.z + baseRotation.z;
			} else {
				ref.current.rotation.x = rotationOffset.current.x + baseRotation.x;
				ref.current.rotation.y = rotationOffset.current.y + baseRotation.y;
				ref.current.rotation.z = rotationOffset.current.z + baseRotation.z;
			}
		}

		if (hintRef.current) {
			const time = clock.getElapsedTime();
			hintRef.current.position.y = Math.sin(time * 2) * 0.1 - 1.5;

			if (firstClickTime.current !== -1) {
				const timeSinceLastClick = clock.getElapsedTime() - firstClickTime.current;

				if (hintScaleTarget.current > 0) {
					const t = timeSinceLastClick * animationSpeed / 10;
					hintScaleTarget.current = Math.sqrt(t) - Math.pow(t, 1.5) + 1;

					hintRef.current.scale.x = hintRef.current.scale.y = hintRef.current.scale.z = hintScaleTarget.current;
				} else {
					hintRef.current.visible = false;
				}
			}

		}
	});


	const onClickHandler = () => {
		clickFlag.current = true;
		onClick();
	};

	const black = getComputedStyle(document.documentElement).getPropertyValue('--black').trim();

	return (
		<>
			<primitive ref={ref} object={scene} scale={[baseScale, baseScale, baseScale]} onClick={onClickHandler}>
				<Text ref={textRef}
					rotation={[0, Math.PI / 2, 0]}
					position={[0.85, 0, 0]}
					fontSize={0.4}
					color={black}
				>
					{text}
				</Text>
			</primitive>
			<Text ref={hintRef}
				position={[0, -1.5, 2]}
				fontSize={0.3}
				color={black}
			>
				Click to roll!
			</Text>
		</>);
}

export default D20;