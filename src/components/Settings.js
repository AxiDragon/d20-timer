import React, { useState } from "react";
import styles from "./css/settings.module.css";

function Settings() {
	const [sliderValue, setSliderValue] = useState(localStorage.getItem('volume') || 0.5);
	const [min, setMin] = useState(localStorage.getItem('min') || 1);
	const [max, setMax] = useState(localStorage.getItem('max') || 20);

	const handleSliderChange = (e) => {
		localStorage.setItem('volume', e.target.value);
		setSliderValue(e.target.value);
	};

	const onMinChange = (e) => {
		localStorage.setItem('min', e.target.value);
		setMin(e.target.value);
	}

	const onMaxChange = (e) => {
		localStorage.setItem('max', e.target.value);
		setMax(e.target.value);
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