import React, {Component} from "react";
import youtube from "../../images/icons/youtube.svg";
import "./style.scss";

class Header extends Component {
	render() {
		return (
			<header className="site-header">
				<div className="logo">
					<img src={youtube} alt="Logo" />
				</div>

				<nav>
					<a href="/">Home</a>
					<a href="/">My channel</a>
					<a href="/">Popular</a>
				</nav>

				<div className="profile" />
			</header>
		);
	}
}

export default Header;
