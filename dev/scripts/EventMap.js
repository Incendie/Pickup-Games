import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';


const EventMap = (props) => {
	const position = [43.6479204,-79.3974025];
	return (			
	  <Map center={position} zoom={13}>
	    <TileLayer
	      url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
	      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	    />
	    {props.events.map( (event)=> {
	    	console.log(event);
	    	let markPos = [event.marker.lat, event.marker.lng];
	    	return(
			    <Marker key={event.id} position={markPos}>
			      <Popup>
			        <span>	
			        	<strong>{event.eventName}</strong>
			        	<br/>{event.eventAddy}
		        		<br/><button onClick={ () => props.removeEvent(event.id)}>Remove Event</button>
						<button onClick={ () => props.joinEvent(event.id)}>Join Event</button>
					</span>
			      </Popup>
			    </Marker>	    		
    		);
	    })}
	  </Map>
	);
}

export default EventMap;