import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./style.scss";

class VideoItem extends Component {
	render() {
		return (
			<Link to={`/watch/${this.props.id}`} className="item-video">
				<img
					src={`http://localhost:3000/${this.props.image}`}
					alt={this.props.title}
				/>
				<h3>{this.props.title}</h3>
				<span className="autor">{this.props.user}</span>
			</Link>
		);
	}
}

export default VideoItem;
