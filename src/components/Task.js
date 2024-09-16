import React, { useEffect, useRef, useState } from "react";

function Task({ task, id }) {
	const [isChecked, setIsChecked] = useState(false);
	const taskDiv = useRef(null);

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	};

	useEffect(() => {
		console.log(`Task ${task} is ${isChecked ? 'checked' : 'unchecked'}`);
		if (isChecked) {
			taskDiv.current.style.textDecoration = 'line-through';
		} else {
			taskDiv.current.style.textDecoration = 'none';
		}
	}, [isChecked]);

	return (
		<div key={id} ref={taskDiv}>
			<input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
			{task}
		</div>
	);
}

export default Task;