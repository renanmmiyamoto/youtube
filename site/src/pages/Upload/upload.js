import api from "../../services/api";

const do_upload = async (userId, newVideo) => {
	try {
		const config = {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		};

		let fd = new FormData();

		fd.append("title", newVideo.title);
		fd.append("description", newVideo.description);
		fd.append("likes", 0);
		fd.append("video", newVideo.video);
		fd.append("thumbnail", newVideo.thumbnail);

		const response = await api.post(`/videos/${userId}`, fd, config);

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
