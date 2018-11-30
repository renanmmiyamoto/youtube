import React, {Component} from "react";
import {FaHome} from "react-icons/fa";
import {NavLink} from "react-router-dom";
import "./style.scss";

class Sidebar extends Component {
	render() {
		return (
			<aside>
				<ul>
					<li className="current">
						<NavLink to="/" activeClassName="current">
							<FaHome />
							Home
						</NavLink>
					</li>
				</ul>
			</aside>
		);
	}
}

export default Sidebar;
