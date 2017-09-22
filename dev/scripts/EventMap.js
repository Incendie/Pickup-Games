import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

const EventMap = (props) => {
	return (
	  <Map center={props.position} zoom={14}>
	    <TileLayer
	      url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
	      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	    />
	    {props.events.map( (event) => {
	    	let markPos = [event.marker.lat, event.marker.lng];
	    	let iconLoc = "gaming";
	    	if(event.eventType!=="gaming"){
	    		iconLoc=event.eventGame;
	    	}
	    	let myIcon = L.icon({
	    	    iconUrl: `../public/assets/mapIcons/${iconLoc}.svg`,
	    	    iconSize: [38, 95],
	    	    iconAnchor: [22, 94],
	    	    popupAnchor: [-3, -76],
	    	});
	    	return(
			    <Marker 
			    		key={event.id}
			    		position={markPos}
			    		icon={myIcon}
			    >
			      <Popup>
			        <span>	
			        	<div>
			        		<strong>{event.eventName}</strong>
			        		<em> - {event.eventGame}</em>
			        	</div>
			        	<em>{event.eventAddy}</em>
			        	<br/>{event.eventJoined}/{event.eventCap} joined
			        	<br/><br/>{event.eventDetails}
		        		<br/>{props.user.uid===event.uid ?
		        			<div>
		        				<br/>You are hosting this event		        			
		        				<br/><button className="mapBtn" onClick={ () => props.removeEvent(event.id)}>Remove Event</button>
		        			</div>
		        			:
		        			<div>
								<br/><button className="mapBtn" onClick={ () => props.joinEvent(event.id)}>Join Event</button>
							</div>
						}
					</span>
			      </Popup>
			    </Marker>	    		
    		);
	    })}
	  </Map>
	);
}

export default EventMap;