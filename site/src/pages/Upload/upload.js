import api from "../../services/api";

const do_upload = async newVideo => {
	try {
		const response = await api.post("/auth/authenticate", {
			title: newVideo.title,
			description: newVideo.description,
			video: newVideo.video,
			thumbnail: newVideo.thumbnail
		});

		console.log(response.data);

		return {
			ok: true
		};
	} catch (response) {
		return {
			ok: false,
			errorMessage: response.data.error
		};
	}
};

export default do_upload;
