import React, {Component, Fragment} from "react";
import Header from "../../components/Header";
import MenuAside from "../../components/MenuAside";
import AsideVideo from "../../components/AsideVideo";

import api from "../../services/api";
import {like} from "../../images";
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

	like = async () => {
		try {
			const response = await api.post(
				"/videos/like/" +
					this.state.video._id +
					"/" +
					JSON.parse(localStorage.getItem("@YOUTUBE:user"))._id
			);

			this.setState({video: response.data});
		} catch (error) {
			this.setState({errorMessage: error});
		}
	};

	render() {
		if (this.state.video.user !== undefined) {
			return (
				<Fragment>
					<Header />

					<main className="video">
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

								<div className="info">
									<div className="top">
										<h3>{this.state.video.title}</h3>

										<button className="follow">
											Subscribe &nbsp;
											{this.state.video.user.followers}
										</button>
									</div>

									<div className="bottom">
										<div className="user">
											<img
												src={`http://localhost:3000/${
													this.state.video.user.avatar
												}`}
												alt="Avatar User"
											/>
											<h4>
												{this.state.video.user.name}
											</h4>
										</div>

										<button
											className="like"
											onClick={this.like}
										>
											<img src={like} alt="Like video" />
											{this.state.video.likes}
										</button>
									</div>
								</div>
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
