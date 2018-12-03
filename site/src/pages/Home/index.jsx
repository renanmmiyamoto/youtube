import React, {Component, Fragment} from "react";
import Header from "../../components/Header";
import MenuAside from "../../components/MenuAside";
import VideoItem from "../../components/VideoItem";

import api from "../../services/api";
import "./style.scss";

class HomePage extends Component {
	state = {
		videos: [],
		errorMessage: ""
	};

	getVideos = async () => {
		try {
			const response = await api.get("/videos/");

			response.data.videos.map(video => (video.user = video.user.name));

			this.setState({videos: response.data.videos});
		} catch (error) {
			this.setState({errorMessage: error});
		}
	};

	componentDidMount() {
		this.getVideos();
	}

	render() {
		return (
			<Fragment>
				<Header />

				<main className="home">
					<MenuAside />

					<div className="content">
						<section>
							{this.state.videos.map(item => {
								return (
									<VideoItem
										key={item._id}
										id={item._id}
										image={item.thumbnail}
										title={item.title}
										user={item.user}
									/>
								);
							})}
						</section>
					</div>
				</main>
			</Fragment>
		);
	}
}

export default HomePage;
