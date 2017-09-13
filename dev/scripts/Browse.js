import React from 'react';
import Autocomplete from 'react-google-autocomplete';

import EventMap from './EventMap.js';

const Browse = (props) => {
	console.log(props);
	return(
		<div>
			<h1>Browse</h1>
			<Autocomplete
			    style={{width: '100%'}}
			    onPlaceSelected={props.handlePosChange}
			    types={['(regions)']}
			    id="mapCentre" 
			    name="mapCentre" 
			    onChange={props.handleChange}
			/>
			<div id="map">
				<EventMap 
					markers={props.markers}
					events={props.events}
					removeEvent={props.removeEvent}
					user={props.user}
					position={props.position}
				/>
			</div>
			<ul>
				{props.events.map((event) => {
					return(
						<li key={event.id}>
							<h2>{event.eventName} - <em>{event.eventGame}</em></h2>
							<p>{event.eventAddy}</p>
							<p>{event.eventDetails}</p>
							<button onClick={ () => props.removeEvent(event.id)}>Remove Event</button>
							<button onClick={ () => props.joinEvent(event.id)}>Join Event</button>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default Browse;