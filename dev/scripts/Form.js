import React from 'react';

const Form = (props) => {
	console.log(props);
	return(
		<section className="addEvent">
			<form onSubmit={props.handleSubmit}>
				<label htmlFor="eventName">Event Name</label>
				<input type="text" id="eventName" name="eventName" onChange={props.handleChange} value={props.state.eventName}/>
				<label htmlFor="eventAddy">Address</label>
				<input type="text" id="eventAddy" name="eventAddy" onChange={props.handleChange} value={props.state.eventAddy}/>
				<button>Host</button>
			</form>
		</section>
	)
}

export default Form;