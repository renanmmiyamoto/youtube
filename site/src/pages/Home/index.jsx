import React, {Component, Fragment} from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import VideoItem from "../../components/VideoItem";

import api from "../../services/api";
import "./style.scss";

class HomePage extends Component {
	state = {
		errorMessage: ""
	};

	getVideos = async () => {
		try {
			const response = await api.get("/videos/");

			console.log(response);
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

				<main>
					<Sidebar />

					<section>
						<VideoItem />
					</section>
				</main>
			</Fragment>
		);
	}
}

export default HomePage;
