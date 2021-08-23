import React, { useState } from 'react';
import axios from 'redaxios';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const Task = (): JSX.Element => {
	const [open, setOpen] = useState(false);
	const [msg, setMsg] = useState('');

	const handleCapture = ({target}) => {
		const data = new FormData();
		data.append('file', target?.files[0]);
		axios
			.post('/api/upload', data, {})
			.then((data) => {
				console.log(data.data);
			}).catch(e => {
			setMsg(e.data);
			setOpen(true);
		});
	};
	return (
		<div>
			<input type="file" onChange={handleCapture}/>
			<Snackbar
				anchorOrigin={{vertical: 'top', horizontal: 'right'}}
				open={open}
				autoHideDuration={1000}>
				<Alert severity="success">
					{msg}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default Task;
