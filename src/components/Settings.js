import React, { useState } from "react";
import styles from "./css/settings.module.css";

function Settings() {
	const [sliderValue, setSliderValue] = useState(localStorage.getItem('volume') || 0.5);
	const [min, setMin] = useState(localStorage.getItem('min') || 1);
	const [max, setMax] = useState(localStorage.getItem('max') || 20);

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

	return (
		<div className={styles.Settings}>
			<h2>Settings</h2>
			<div>Volume</div>
			<input
				type="range"
				min="0"
				max="1"
				step="0.01"
				value={sliderValue}
				onChange={handleSliderChange}
			/>
			<br />
			<br />
			<div>Dice Range</div>
			<div className={styles.rangeInput}>
				<input type="number" onChange={onMinChange} value={min} min='1' max={Number(max) - 1} />
				<p>
					to
				</p>
				<input type="number" onChange={onMaxChange} value={max} min={Number(min) + 1} />
			</div>
		</div>
	);
}

export default Settings;