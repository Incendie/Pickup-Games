import React from 'react';
import Autocomplete from 'react-google-autocomplete';

const Form = (props) => {
	const inputProps = {
	      value: props.state.eventAddy,
	      onChange: props.handleAddyChange,
	    }
	return(
		<section className="addEvent">
			<form onSubmit={props.handleSubmit}>
				<label htmlFor="eventName">Event Name</label>
				<input type="text" id="eventName" name="eventName" onChange={props.handleChange} value={props.state.eventName} placeholder="Give your event name"/>
				<label htmlFor="eventAddy">Address</label>
				<Autocomplete
				    style={{width: '100%'}}
				    onPlaceSelected={props.handleAddyChange}
				    types={['address']}
				    id="eventAddy" 
				    name="eventAddy" 
				    onChange={props.handleChange}
				    value={props.state.eventAddy}
				/>
				<div className="middleLine">
					<div className="formBox">
						<label htmlFor="eventCap">Max No. of Players</label>
						<input type="number" name="eventCap" id="eventCap" onChange={props.handleChange} value={props.state.eventCap}/>
					</div>
					<div className="radioContainer">
						<div className="radioBox">
							<input type="radio" name="eventType" id="eventSport" onClick={props.handleChange} value="sports"/>
							<label htmlFor="eventSport">Sports</label>
						</div>
						<div className="radioBox">
							<input type="radio" name="eventType" id="eventGaming" onClick={props.handleChange} value="gaming"/>
							<label htmlFor="eventGaming">Gaming</label>
						</div>
					</div>
				</div>	
				{props.eventType==="sports" ?
					<select onChange={props.handleChange} name="eventGame">
						<option name="eventGame" value="badminton">Badminton</option>
						<option name="eventGame" value="baseball">Baseball/Softball</option>
						<option name="eventGame" value="basketball">Basketball</option>
						<option name="eventGame" value="bowling">Bowling</option>
						<option name="eventGame" value="cricket">Cricket</option>
						<option name="eventGame" value="curling">Curling</option>
						<option name="eventGame" value="football">Football</option>
						<option name="eventGame" value="hockey">Hockey</option>
						<option name="eventGame" value="lacrosse">Lacrosse</option>
						<option name="eventGame" value="rollerskate">Roller Derby</option>
						<option name="eventGame" value="rugby">Rugby</option>
						<option name="eventGame" value="skating">Skating</option>
						<option name="eventGame" value="soccer">Soccer</option>
						<option name="eventGame" value="tennis">Tennis</option>
						<option name="eventGame" value="volleyball">Volleyball</option>
						<option name="eventGame" value="yoga">Yoga</option>
						<option name="eventGame" value="other">Other (Details Below)</option>
					</select>
					:
					<div className="gameContainer">
						<label htmlFor="gameName">Name of Game</label>
						<input type="text" id="gameName" name="eventGame" onChange={props.handleChange} value={props.state.eventGame} placeholder="Name of the game"/>
					</div>
				}
				<label htmlFor="eventDetails">Details</label>
				<textarea name="eventDetails" id="eventDetails" cols="30" rows="5" onChange={props.handleChange} placeholder="Some details about the event as a whole"></textarea>
				<button>Host</button>
			</form>
		</section>
	)
}

export default Form;