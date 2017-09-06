import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route, Link, NavLink} from 'react-router-dom';
	import { ajax } from 'jquery';

console.log("ewoks");
class App extends React.Component {
	render(){
		return(
			<div>
				<h1>Test</h1>
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('app'));