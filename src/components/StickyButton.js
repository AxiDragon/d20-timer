import React from "react";
import styles from "./css/stickyButton.module.css"

function StickyButton({ iconName = 'menu', side = 'right' }) {
	const handleClick = () => {
		document.dispatchEvent(new CustomEvent(iconName + 'ButtonPressed'));
	}

	return (
		<span className={`${styles.StickyButton} ${styles[side]}`} onClick={handleClick}>
			<div className={`material-symbols-outlined ${styles.icon}`}>
				{iconName}
			</div>
		</span>
	);
}

export default StickyButton;