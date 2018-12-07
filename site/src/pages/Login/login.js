import api from "../../services/api";

const do_login = async user => {
	try {
		const response = await api.post("/auth/authenticate", {
			email: user.email,
			password: user.password
		});

		console.log(response);
	} catch (error) {
		return error.data;
	}
};

export {do_login};
