import React from 'react';
import ReactDOM from 'react-dom';

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