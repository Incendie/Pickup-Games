import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route, Link, NavLink} from 'react-router-dom';
	import { ajax } from 'jquery';

import firebase from './firebase';
import Host from './Host';

const dbRef = firebase.database().ref(`/events`);

class Browse extends React.Component {
	render(){
		return(
			<div>
				<h1>Browse</h1>
			</div>
		)
	}
}

const Form = (props) => {
	console.log(props);
	return(
		<section className="addEvent">
			<form onSubmit={props.handleSubmit}>
				<label htmlFor="eventName">Event Name</label>
				<input type="text" id="eventName" name="eventName" onChange={props.handleChange} value={props.eventName}/>
				<label htmlFor="eventAddy">Address</label>
				<input type="text" id="eventAddy" name="eventAddy" onChange={props.handleChange} value={props.eventAddy}/>
				<button type="submit">Host</button>
			</form>
		</section>
	)
}

class App extends React.Component {
	constructor() {
		super();
		this.state={
			eventName: "",
			eventAddy: "",
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();

		const newEvent = {
			eventName: this.state.eventName,
			eventAddy: this.state.eventAddy,
		}
		dbRef.push(newEvent);
	}

	handleChange(e){
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	render(){
		return(
			<Router>
				<div>
					<Link to="/host"><button>Host an Event</button></Link>
					<Link to="/browse"><button>Browse Events</button></Link>
					<Route path="/host" render={(props)=> (
						<Host 
							handleSubmit={this.handleSubmit} 
							handleChange={this.handleChange}
							state={this.state}/>
						)}>
					</Route>
					<Route path="/browse" component={Browse}></Route>
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