import api from "../../services/api";

const do_register = async newUser => {
	try {
		const config = {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		};

		let fd = new FormData();

		fd.append("name", newUser.name);
		fd.append("email", newUser.email);
		fd.append("bornDate", newUser.bornDate);
		fd.append("avatar", newUser.avatar);
		fd.append("password", newUser.password);

		const response = await api.post(`/auth/register`, fd, config);

		console.log(response.data);

		const {token, user} = response.data;

		localStorage.setItem("@YOUTUBE:token", token);
		localStorage.setItem("@YOUTUBE:user", JSON.stringify(user));

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

export {do_register};
