import React, {Component} from "react";
import VideoItem from "../VideoItem";

import api from "../../services/api";
import "./style.scss";

class AsideVideo extends Component {
	state = {
		currentVideo: "",
		videos: [],
		errorMessage: ""
	};

	getUserVideos = async () => {
		try {
			const response = await api.get("/videos");
			let videos = [];

			response.data.videos.forEach(video => {
				if (video.user._id === this.props.user) {
					if (video._id !== this.state.currentVideo) {
						videos.push(video);
					}
				}
			});

			this.setState({videos});
		} catch (error) {
			this.setState({errorMessage: error});
		}
	};

	componentWillMount() {
		this.setState({currentVideo: this.props.currentVideo});
	}

	componentDidMount() {
		this.getUserVideos();
	}

	componentWillReceiveProps(nextProps) {
		console.log(this.props.currentVideo);

		console.log(nextProps.currentVideo);

		if (this.props.currentVideo !== nextProps.currentVideo) {
			this.setState({currentVideo: nextProps.currentVideo});

			this.getUserVideos();
		}
	}

	render() {
		return (
			<aside className="related">
				<ul>
					{this.state.videos.map(video => {
						return (
							<li key={video._id}>
								<VideoItem
									id={video._id}
									image={video.thumbnail}
									title={video.title}
									user={video.user.name}
								/>
							</li>
						);
					})}
				</ul>
			</aside>
		);
	}
}

export default AsideVideo;
