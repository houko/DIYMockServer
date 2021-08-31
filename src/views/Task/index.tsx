import React, { useState } from 'react';
import axios from 'redaxios';

const Task = (): JSX.Element => {
	const [msg, setMsg] = useState('');

	const handleCapture = ({target}) => {
		const data = new FormData();
		data.append('file', target?.files[0]);
		axios
			.post('/api/upload', data, {})
			.then((data) => {
				console.log(data.data);
			})
			.catch((e) => {
				setMsg(e.data);
			});
	};
	return (
		<div>
			<input type="file" onChange={handleCapture}/>
			<div>
				<h2>{msg}</h2>
			</div>
		</div>
	);
};

export default Task;
