import React from "react";
import styles from "./css/stickyButton.module.css"

function StickyButton({ iconName = 'menu', side = 'right' }) {
	return (
		<span className={`${styles.StickyButton} ${styles[side]}`}>
			<div className={`material-symbols-outlined ${styles.icon}`}>
				{iconName}
			</div>
		</span>
	);
}

export default StickyButton