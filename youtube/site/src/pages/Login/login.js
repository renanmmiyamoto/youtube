import api from "../../services/api";

const do_login = async newUser => {
	try {
		const response = await api.post("/auth/authenticate", {
			email: newUser.email,
			password: newUser.password
		});

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

export {do_login};
