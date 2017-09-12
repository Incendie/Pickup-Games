import React from 'react';
import Form from './Form';

const Host = (props) => {
	return(
		<div>
			<h1>Host an Event</h1>
			<Form 
				handleSubmit={props.handleSubmit}
				handleChange={props.handleChange}
				state={props.state}
				eventType={props.eventType}
			/>
		</div>
	)
}

export default Host;