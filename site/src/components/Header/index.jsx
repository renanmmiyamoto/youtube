import React, {Component} from "react";
import {Link} from "react-router-dom";
import {logo} from "../../images";
import "./style.scss";

class Header extends Component {
	state = {
		avatar: JSON.parse(localStorage.getItem("@YOUTUBE:user")).avatar
	};

	render() {
		return (
			<header className="site-header">
				<div className="logo">
					<img src={logo} alt="Logo" />
				</div>

				<nav>
					<Link to="/">Home</Link>
					<Link to="/">My channel</Link>
					<Link to="/">Popular</Link>
				</nav>

				<div className="profile">
					<img
						src={`http://localhost:3000/${this.state.avatar}`}
						alt=""
					/>
				</div>
			</header>
		);
	}
}

export default Header;
