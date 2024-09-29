import React, { useRef, useState } from "react";
import styles from "./css/overlayMenuContent.module.css";
import beep from "../assets/beep.mp3";

function Settings() {
	const [sliderValue, setSliderValue] = useState(localStorage.getItem('volume') || 0.5);
	const [min, setMin] = useState(localStorage.getItem('min') || 1);
	const [max, setMax] = useState(localStorage.getItem('max') || 20);
	const warningButton = useRef(null);
	const deleteButton = useRef(null);

	function handleSliderChange(e) {
		const clampedValue = Math.min(1, Math.max(0, e.target.value));
		localStorage.setItem('volume', clampedValue);
		setSliderValue(clampedValue);
	};

	function onMinChange(e) {
		const clampedValue = Math.min(Number(max) - 1, Math.max(1, e.target.value));
		localStorage.setItem('min', clampedValue);
		setMin(clampedValue);
	}

	function onMaxChange(e) {
		const clampedValue = Math.max(Number(min) + 1, e.target.value);
		localStorage.setItem('max', clampedValue);
		setMax(clampedValue);
	}

	const playSound = () => {
		const audio = new Audio(beep);
		audio.volume = sliderValue;
		audio.play();
	};

	const displayWarning = () => {
		console.log(warningButton.current.style.display);
		deleteButton.current.style.display = 'inline-block';
		warningButton.current.style.display = 'none';

		setTimeout(() => {
			deleteButton.current.style.display = 'none';
			warningButton.current.style.display = 'inline-block';
		}, 2000);
	};

	const deleteData = () => {
		localStorage.clear();

		window.location.reload();
	};

	return (
		<div className={styles.OverlayMenuContent}>
			<h2>Settings</h2>
			<div>
				<div>Volume</div>
				<input
					type="range"
					min="0"
					max="1"
					step="0.01"
					value={sliderValue}
					onChange={handleSliderChange}
				/>
				<p>Test Volume</p>
				<button onClick={playSound} className={`${styles.iconButton} material-symbols-outlined`}>
					notifications_active
				</button>
			</div>
			<br />
			<div>Dice Range</div>
			<div className={styles.rangeInput}>
				<input type="number" onChange={onMinChange} value={min} min='1' max={Number(max) - 1} />
				<p>
					to
				</p>
				<input type="number" onChange={onMaxChange} value={max} min={Number(min) + 1} />
			</div>
			<br />
			<div>Delete Data</div>
			<button className={styles.textButton} onClick={displayWarning} ref={warningButton}>
				Delete Data
			</button>
			<button className={`${styles.textButton} ${styles.deleteButton} `} style={{ display: 'none' }} onClick={deleteData} ref={deleteButton}>
				Are you sure?
			</button>
		</div>
	);
}

export default Settings;