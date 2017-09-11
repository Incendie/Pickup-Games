import React from 'react';

import EventMap from './EventMap.js';

const Browse = (props) => {
	
	return(
		<div>
			<h1>Browse</h1>
			<div id="map">
				<EventMap 
					markers={props.markers}
					events={props.events}
					removeEvent={props.removeEvent}
				/>
			</div>
			<ul>
				{props.events.map((event) => {
					return(
						<li key={event.id}>
							<h2>{event.eventName}</h2>
							<p>{event.eventAddy}</p>
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