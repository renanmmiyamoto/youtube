import React, {Component} from "react";
import {FaHome} from "react-icons/fa";
import {NavLink} from "react-router-dom";
import "./style.scss";

class MenuAside extends Component {
	render() {
		return (
			<aside className="menuAside">
				<ul>
					<li>
						<NavLink to="/" activeClassName="current">
							<FaHome />
							Home
						</NavLink>
					</li>
					<li>
						<NavLink to="/subscriptions" activeClassName="current">
							<FaHome />
							Subscriptions
						</NavLink>
					</li>

					<hr />

					<li>
						<NavLink to="/history" activeClassName="current">
							<FaHome />
							History
						</NavLink>
					</li>
					<li>
						<NavLink to="/watch_later" activeClassName="current">
							<FaHome />
							Watch Later
						</NavLink>
					</li>
					<li>
						<NavLink to="/liked_videos" activeClassName="current">
							<FaHome />
							Liked Videos
						</NavLink>
					</li>

					<hr />
				</ul>
			</aside>
		);
	}
}

export default MenuAside;
