import React from 'react';
import $ from 'jquery';

const Header = (props) => {
	return(
			<header>
				<div className="titleBox">
					<h1><a href="#home" name="" onClick={(e)=>{props.handleClick(e, props.history)}}>Pickup Games</a></h1>
					<p>Host or Join an Event Near You</p>
				</div>
				<div id="hamburger" onClick={props.hamburgerClick}>
					<span></span>
					<span></span>
					<span></span>
				</div>
				<div className="aside">
					{props.user ?
						<div>
							<div className='user-profile'>
								<img src={props.user.photoURL} />
								<p>{props.user.displayName || props.user.email}</p>
							</div>
						</div>
						:
						<div className='wrapper'>
							<p>You must be logged in to browse or host events.</p>
						</div>
					}
					{props.user ? 
						<button className="logoutBtn" onClick={props.logout}>Logout</button>
						:
						<button className="loginBtn" onClick={props.login}>Login</button>
					}
					{props.user ?
						<div className="buttonBox">
							<button name="host" onClick={(e)=>{props.handleClick(e, props.history)}}>Host an Event</button>
							<button name="browse" onClick={(e)=>{props.handleClick(e, props.history)}}>Browse Events</button>
						</div>
						:
						null
					}
				</div>
			</header>
	)
}

export default Header;