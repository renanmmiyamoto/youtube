import React, {Component} from "react";

class VideoItem extends Component {
	render() {
		return (
			<article>
				<img src={this.props.image} alt={this.props.title} />
				<h3>{this.props.title}</h3>
				<span className="autor">{this.props.user}</span>
			</article>
		);
	}
}

export default VideoItem;
