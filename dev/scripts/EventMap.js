import React from 'react';

const EventMap = () => {
	return (
		<div id="mapid"></div>
	)
}

	var mymap = L.map('mapid').setView([51.505, -0.09], 13);
export default EventMap;