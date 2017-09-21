import React from 'react';
import Form from './Form';

const Host = (props) => {
	return(
		<div className="wrapper">
			<h1>Host an Event</h1>
			<Form 
				handleSubmit={props.handleSubmit}
				handleChange={props.handleChange}
				state={props.state}
				eventType={props.eventType}
				handleEventSport={props.handleEventSport}
				handleEventGame={props.handleEventGame}
				handleAddyChange={props.handleAddyChange}
			/>
		</div>
	)
}

export default Host;