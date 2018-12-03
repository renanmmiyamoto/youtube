import React, {Component} from "react";
import VideoItem from "../VideoItem";

import api from "../../services/api";
import "./style.scss";

class AsideVideo extends Component {
	state = {
		videos: [],
		errorMessage: ""
	};

	getUserVideos = async () => {
		try {
			const response = await api.get("/videos");

			response.data.video.filter(video => {
				if (video.user._id === this.props.user) {
					return video;
				}
			});

			console.log(response.data.video);

			// this.setState({video: response.data.video});
		} catch (error) {
			this.setState({errorMessage: error});
		}
	};

	componentDidMount() {
		this.getUserVideos();
	}

	render() {
		return (
			<aside>
				<ul>
					<li className="current">
						<VideoItem />
					</li>
				</ul>
			</aside>
		);
	}
}

export default AsideVideo;
