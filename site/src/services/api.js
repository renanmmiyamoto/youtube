import {create} from "apisauce";
import {isAuthenticated} from "./auth";

const api = create({
	baseURL: "http://localhost:3000"
});

api.addRequestTransform(request => {
	if (isAuthenticated()) {
		request.headers.authorization =
			"Bearer " + localStorage.getItem("@YOUTUBE:token");
	}
});

api.addResponseTransform(response => {
	if (!response.ok) throw response;
});

export default api;
