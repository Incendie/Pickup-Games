import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route, Link, NavLink} from 'react-router-dom';
import { ajax } from 'jquery';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Autocomplete from 'react-google-autocomplete';

import firebase, {auth, provider} from './firebase';
import Host from './Host';
import Browse from './Browse';
import Header from './Header';

const dbRef = firebase.database().ref(`/events`);

class App extends React.Component {
	constructor() {
		super();
		this.state={
			eventName: "",
			eventAddy: "",
			events: [],
			lat: 0,
			lng: 0,
			markers: [],
			user: null,
			eventGame: "",
			eventType: "",
			eventDetails: "",
			position: [],
			mapCentre: [43.6479204,-79.3974025],
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.removeEvent = this.removeEvent.bind(this);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.handleAddyChange = this.handleAddyChange.bind(this);
		this.handlePosChange = this.handlePosChange.bind(this);
	}
	
	login() {
		auth.signInWithPopup(provider)
			.then((res)=>{
				let user = res.user;
				this.setState({user});
			})
	}

	logout() {
		auth.signOut()
			.then(()=>{
				this.setState({
					user: null,
				});
			});
	}

	handleSubmit(e){
		e.preventDefault();

		ajax({
			url: `https://maps.googleapis.com/maps/api/geocode/json`,
			data: {
				key: `AIzaSyA-hcaO-Sia3HhAt4OjAwn8ltnt_UYCDts`,
				address: this.state.eventAddy
			}
		}).then((res)=> {
			let address = res.results[0];

			geocodeByAddress(this.state.eventAddy)
				.then(results => getLatLng(results[0]))
				.then(latLng => console.log(`Success ${latLng}`))
				.catch(error => console.log(`Error ${error}`));

			const newEvent = {
				eventName: this.state.eventName,
				eventAddy: address.formatted_address,
				marker: {
					lat: address.geometry.location.lat,
					lng: address.geometry.location.lng,
				},
				uid: this.state.user.uid,
				eventGame: this.state.eventGame,
				eventType: this.state.eventType,
				eventDetails: this.state.eventDetails,
			}

			dbRef.push(newEvent);
			let marker = {
				lat: address.geometry.location.lat, 
				lng: address.geometry.location.lng,
			}

			this.setState ({
				eventName: "",
				eventAddy: "",
				eventDetails: "",
				eventGame: "",
			});	
		});
	}

	handleChange(e){
		this.setState({
			[e.target.name]: e.target.value,
		}); 
	}

	handlePosChange(city) {
		console.log(city);
		const pos = [];
		pos.push(city.geometry.location.lat());
		pos.push(city.geometry.location.lng());
		this.setState({mapCentre:pos});
	}

	handleAddyChange(address){
		this.setState({eventAddy:address.formatted_address});
	}

	removeEvent(i){
		const eventRef = firebase.database().ref(`/events/${i}`)
		eventRef.remove();
	}

	joinEvent(i) {
		const eventRef = firebase.database().ref(`/events/${i}`)
		//code for joining event by adding username
	}

	componentDidMount() {
		auth.onAuthStateChanged((user) => {
		    if (user) {
		      this.setState({ user });
		    } 
	  	});
	  	
		dbRef.on("value", (data) => {
			const gamesArray = [];
			const items = data.val();
			const markersArray = [];

			for (let key in items){
				const newItem = items[key];
				newItem.id = key;
				gamesArray.push(newItem);
			}

			this.setState({
				events: gamesArray,
			})
		});
	}

	render(){
		return(
			<div>
				<Header />
				<Router>
					<div className="appContainer">
						<aside>
					        {this.state.user ?
								<div>
									<div className='user-profile'>
										<img src={this.state.user.photoURL} />
										<p>{this.state.user.displayName || this.state.user.email}</p>
									</div>
								</div>
								:
								<div className='wrapper'>
									<p>You must be logged in to see the events and submit to it.</p>
								</div>
					        }
							<Link to="/host"><button>Host an Event</button></Link>
							<Link to="/browse"><button>Browse Events</button></Link>
							{this.state.user ? 
					        	<button className="logoutBtn" onClick={this.logout}>Logout</button>
				        		:
					        	<button className="loginBtn" onClick={this.login}>Login</button>
					        }
						</aside>
						<main>
							<Route path="/host" render={() => (
								<Host 
									handleSubmit={this.handleSubmit} 
									handleChange={this.handleChange}
									state={this.state}
									eventType={this.state.eventType}
									handleEventSport={this.handleEventSport}
									handleEventGame={this.handleEventGame}
									handleAddyChange={this.handleAddyChange}
								/>)}>
							</Route>
							<Route path="/browse" render={() => (
								<Browse 
									removeEvent={this.removeEvent}
									lat={this.state.lat}
									lng={this.state.lng}
									events={this.state.events}
									markers={this.state.markers}
									user={this.state.user}
									position={this.state.mapCentre}
									handleChange={this.handleChange}
									handlePosChange={this.handlePosChange}
								/>)}>
							</Route>
						</main>
					</div>
				</Router>
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('app'));

/*BASE
	1. User enters info:
		Event Name, Address, Event Details, (time?), type(game/sport)
	2. Push all info into Firebase with unique event IDs of some sort(or use base Firebase IDs)
	3. Connect with Google Maps API (or Leaflet?) to pin the location for other users to see
	4. Other users can click join/leave
*/

/*EXTRAS
	- Photos on each event based on type of event
	- Admin privileges for host
	- Log in
	- Automatic delete when time expires
*/