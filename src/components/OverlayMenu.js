import React, { useEffect, useRef } from "react";
import styles from "./css/overlayMenu.module.css"


function OverlayMenu({ openEventName, content }) {
	const menu = useRef(null);

	function openMenu() {
		menu.current.style.display = 'flex';
	}

	function closeMenu() {
		menu.current.style.display = 'none';
	}

	useEffect(() => {
		console.log(String(openEventName));
		document.addEventListener(String(openEventName), openMenu);

		return () => { document.removeEventListener(String(openEventName), openMenu) };
	}, []);

	return (
		<div style={{ display: 'none' }} ref={menu} className={styles.OverlayMenu}>
			<div className={styles.content}>
				{content}
				<button className={`material-symbols-outlined ${styles.closeButton}`} onClick={closeMenu}>close</button>
			</div>
		</div>
	);
}

export default OverlayMenu;