import React, {Component} from "react";
import {FaHome} from "react-icons/fa";
import {NavLink} from "react-router-dom";
import "./style.scss";

class MenuAside extends Component {
	render() {
		return (
			<aside className="menuAside">
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

export default MenuAside;
