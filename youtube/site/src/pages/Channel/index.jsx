import React, {Component, Fragment} from "react";
import {Header, MenuAside, VideoItem} from "../../components";
import {Link} from "react-router-dom";

import api from "../../services/api";
import {filterFollowers} from "../../utils";
import "./style.scss";

class ChannelPage extends Component {
	state = {
		videos: [],
		errorMessage: "",
		user: {},
		myself: false
	};

	getVideos = async () => {
		try {
			const {idUser} = this.props.match.params;
			let response = "";

			response = await api.get(`/videos/user/${idUser}`);

			this.setState({
				videos: response.data.videos,
				user: response.data
			});

			if (
				response.data._id ===
				JSON.parse(localStorage.getItem("@YOUTUBE:user"))._id
			) {
				this.setState({myself: true});
			}
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

				<main className="channel">
					<MenuAside />

					<div className="content">
						<header>
							<div className="user">
								<img
									src={`http://localhost:3000/${
										this.state.user.avatar
									}`}
									alt="Avatar Canal"
								/>
								<div>
									<h2>{this.state.user.name}</h2>
									<span>
										{this.state.user.followers}
										{this.state.user.followers > 1
											? " inscritos"
											: " inscrito"}
									</span>
								</div>
							</div>

							{this.state.myself ? (
								<Link to="/upload" className="upload">
									Upload Vídeo
								</Link>
							) : (
								<button className="follow">
									{filterFollowers(this.state.user.followers)}
								</button>
							)}
						</header>

						<section>
							{this.state.videos.length > 0 ? (
								this.state.videos.map(item => {
									return (
										<VideoItem
											key={item._id}
											id={item._id}
											image={item.thumbnail}
											title={item.title}
											user={item.user.name}
										/>
									);
								})
							) : (
								<p>Você ainda não postou nenhum vídeo.</p>
							)}
						</section>
					</div>
				</main>
			</Fragment>
		);
	}
}

export default ChannelPage;
