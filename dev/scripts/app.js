import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route, Link, NavLink} from 'react-router-dom';
import { ajax } from 'jquery';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';	

import firebase, {auth, provider} from './firebase';
import Host from './Host';
import Browse from './Browse';

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
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.removeEvent = this.removeEvent.bind(this);
	}
	
	login() {
		auth.signInWithPopup(provider)
			.then((res)=>{
				this.setState({
					user: res.user,
				});
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
				key: `AIzaSyCwGfv4png_UUby-c5yuyRrMYv4ipsCNVU`,
				address: this.state.eventAddy
			}
		}).then((res)=> {
			let address = res.results[0];
			const newEvent = {
				eventName: this.state.eventName,
				eventAddy: address.formatted_address,
				marker: {
					lat: address.geometry.location.lat,
					lng: address.geometry.location.lng,
				}
			}

			dbRef.push(newEvent);
			let marker = {
				lat: address.geometry.location.lat, 
				lng: address.geometry.location.lng,
			}

			this.state = {
				eventName: "",
				eventAddy: "",
			};	
		});
	}

	handleChange(e){
		this.setState({
			[e.target.name]: e.target.value,
		}); 
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
			<Router>
				<div>
					{this.state.user ? 
			        	<button onClick={this.logout}>Logout</button>
		        		:
			        	<button onClick={this.login}>Login</button>
			        }
					<Link to="/host"><button>Host an Event</button></Link>
					<Link to="/browse"><button>Browse Events</button></Link>
					<Route path="/host" render={() => (
						<Host 
							handleSubmit={this.handleSubmit} 
							handleChange={this.handleChange}
							state={this.state}
						/>)}>
					</Route>
					<Route path="/browse" render={() => (
						<Browse 
							removeEvent={this.removeEvent}
							lat={this.state.lat}
							lng={this.state.lng}
							events={this.state.events}
							markers={this.state.markers}
						/>)}>
					</Route>
				</div>
			</Router>
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