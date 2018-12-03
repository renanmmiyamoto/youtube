import React, {Component, Fragment} from "react";
import Header from "../../components/Header";
import MenuAside from "../../components/MenuAside";
import AsideVideo from "../../components/AsideVideo";
import VideoItem from "../../components/VideoItem";

import api from "../../services/api";
import "./style.scss";

class VideoPage extends Component {
	state = {
		video: {},
		errorMessage: ""
	};

	getVideo = async () => {
		try {
			const response = await api.get(
				`/videos/${this.props.match.params.idVideo}`
			);

			this.setState({video: response.data.video});
		} catch (error) {
			this.setState({errorMessage: error});
		}
	};

	componentDidMount() {
		this.getVideo();
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
									<iframe
										src={`http://localhost:3000/${
											this.state.video.video
										}`}
										frameBorder="0"
										title={this.state.video.title}
										allowFullScreen
									/>
								</div>
							</section>

							<AsideVideo user={this.state.video.user._id} />
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
