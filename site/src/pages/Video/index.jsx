import React, {Component, Fragment} from "react";
import Header from "../../components/Header";
import MenuAside from "../../components/MenuAside";
import AsideVideo from "../../components/AsideVideo";
import VideoItem from "../../components/VideoItem";

import api from "../../services/api";
import "./style.scss";

class VideoPage extends Component {
	state = {
		idVideo: "",
		video: {},
		errorMessage: ""
	};

	getVideo = async () => {
		try {
			const response = await api.get(`/videos/${this.state.idVideo}`);

			this.setState({video: response.data.video});
		} catch (error) {
			this.setState({errorMessage: error});
		}
	};

	componentWillMount() {
		this.setState({idVideo: this.props.match.params.idVideo});
	}

	componentDidMount() {
		this.getVideo();
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.idVideo !== nextProps.match.params.idVideo) {
			this.getVideo();

			this.setState({idVideo: nextProps.match.params.idVideo});
		}
	}

	render() {
		if (this.state.video.user !== undefined) {
			return (
				<Fragment>
					<Header />

					<main className="home">
						<MenuAside />

						<div className="content">
							<section>
								<div className="iframe-container">
									<video
										controls
										autoPlay={false}
										name="media"
									>
										<source
											src={`http://localhost:3000/${
												this.state.video.video
											}`}
											type="video/mp4"
										/>
									</video>
								</div>

								<h3>{this.state.video.title}</h3>
								<h3>{this.state.video.video}</h3>
							</section>

							<AsideVideo
								user={this.state.video.user._id}
								currentVideo={this.props.match.params.idVideo}
							/>
						</div>
					</main>
				</Fragment>
			);
		} else {
			return <p>Carregando...</p>;
		}
	}
}

export default VideoPage;
