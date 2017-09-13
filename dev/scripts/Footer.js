import React from 'react';
import FontAwesome from 'react-fontawesome';

const Footer = () => {
	return( 
		<footer>
			<div className="footLinks">
				<a href="https://twitter.com/coding_li">Twitter<i className="fa fa-twitter" aria-hidden="true"></i></a>
				<a href="https://github.com/Incendie">Github<i className="fa fa-github" aria-hidden="true"></i></a>
				<a href="contact@ansonli.io">Email<i className="fa fa-envelope" aria-hidden="true"></i></a>
				<a href="https://www.linkedin.com/in/ansonsfli/">LinkedIn<i className="fa fa-linkedin-square" aria-hidden="true"></i></a>
			</div>
		</footer>
	)
}

export default Footer;