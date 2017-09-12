import React from 'react';

const Form = (props) => {
	return(
		<section className="addEvent">
			<form onSubmit={props.handleSubmit}>
				<label htmlFor="eventName">Event Name</label>
				<input type="text" id="eventName" name="eventName" onChange={props.handleChange} value={props.state.eventName}/>
				<label htmlFor="eventAddy">Address</label>
				<input type="text" id="eventAddy" name="eventAddy" onChange={props.handleChange} value={props.state.eventAddy}/>
				<input type="radio" id="eventSport" onClick={()=>{props.eventType="sports"}}/>
				<label htmlFor="eventSport">Sports</label>
				<input type="radio" id="eventGaming" onClick={()=>{props.eventType="gaming"}}/>
				<label htmlFor="eventGaming">Gaming</label>
				{props.eventType==="sports" ?
					<select>
						<option value="basketball"></option>
						<option value="baseball"></option>
					</select>
					:
					<div>
						<label htmlFor="gameName">Name of Game</label>
						<input type="text" id="gameName" name="gameName" onChange={props.handleChange} value={props.state.gameName}/>
					</div>
				}
				<button>Host</button>
			</form>
		</section>
	)
}

export default Form;