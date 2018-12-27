import React, {Component, Fragment} from "react";
import {Redirect} from "react-router-dom";
import {Header, MenuAside} from "../../components";

import "./style.scss";
import do_upload from "./upload";
import {title, description, video, image} from "../../images";

class UploadPage extends Component {
	state = {
		newVideo: {
			title: "",
			description: "",
			video: {},
			thumbnail: {}
		},
		errorMessage: ""
	};

	changeTextarea = e => {
		if (e.keyCode === 13) {
			e.target.style.height = e.target.clientHeight + 19 + "px";
		} else {
			e.target.style.height =
				39 + 19 * (e.target.value.split("\n").length - 1) + "px";
		}
	};

	handleFileState = e => {
		const file = e.target.files[0];

		this.setState({
			newVideo: {
				...this.state.newVideo,
				[e.target.id]: file
			}
		});
	};

	uploadVideo = async e => {
		e.preventDefault();

		const {title, description, video, thumbnail} = this.state.newVideo;

		if (
			title === "" ||
			description === "" ||
			video === "" ||
			thumbnail === ""
		) {
			this.setState({errorMessage: "Todos os campos são obrigatórios"});
			return;
		}

		const upload = await do_upload(
			JSON.parse(localStorage.getItem("@YOUTUBE:user"))._id,
			this.state.newVideo
		);

		if (!upload.ok) {
			this.setState({errorMessage: upload.errorMessage});
			return;
		} else {
			this.setState({errorMessage: ""});
			console.log("foisss");

			return this.props.history.push(
				`/channel/${
					JSON.parse(localStorage.getItem("@YOUTUBE:user"))._id
				}`
			);
		}
	};

	render() {
		return (
			<Fragment>
				<Header />

				<main className="upload">
					<MenuAside />

					<div className="content">
						<form encType="multipart/form-data">
							<h2>Upload a video in your channel</h2>

							<label>
								<img src={title} alt="Title of video" />
								<input
									type="text"
									placeholder="Title"
									value={this.state.newVideo.title}
									onChange={e =>
										this.setState({
											newVideo: {
												...this.state.newVideo,
												title: e.target.value
											}
										})
									}
								/>
							</label>

							<label>
								<img
									src={description}
									alt="Description of video"
								/>
								<textarea
									value={this.state.newVideo.description}
									placeholder="Description"
									onChange={e =>
										this.setState({
											newVideo: {
												...this.state.newVideo,
												description: e.target.value
											}
										})
									}
									onKeyDown={e => this.changeTextarea(e)}
								/>
							</label>

							<div className="file">
								<input
									type="file"
									id="video"
									value={this.state.newVideo.video.name && ""}
									onChange={this.handleFileState.bind(this)}
								/>
								<label htmlFor="video">
									<img src={video} alt="File of video" />
									<span>
										{this.state.newVideo.video.length === 0
											? "File of video"
											: this.state.newVideo.video.name}
									</span>
								</label>
							</div>

							<div className="file">
								<input
									type="file"
									id="thumbnail"
									value={
										this.state.newVideo.thumbnail.name && ""
									}
									onChange={this.handleFileState.bind(this)}
								/>
								<label htmlFor="thumbnail">
									<img src={image} alt="Thumbnail of video" />
									<span>
										{this.state.newVideo.thumbnail
											.length === 0
											? "Thumbnail of video"
											: this.state.newVideo.thumbnail
													.name}
									</span>
								</label>
							</div>

							{this.state.errorMessage && (
								<p className="errorMessage">
									{this.state.errorMessage}
								</p>
							)}

							<button onClick={e => this.uploadVideo(e)}>
								Upload video
							</button>
						</form>
					</div>
				</main>
			</Fragment>
		);
	}
}

export default UploadPage;
