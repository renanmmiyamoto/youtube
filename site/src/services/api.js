import {create} from "apisauce";

const api = create({
	baseURL: "http://localhost:3000"
});

api.addRequestTransform(request => {
	request.headers.authorization =
		"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMDU1NjFiNGFhYWI0NDNlYzRjMzBmNCIsImlhdCI6MTU0Mzg1MzYwMSwiZXhwIjoxNTQzOTQwMDAxfQ.XCSVOQCJNzIjKttWDGm7PhU78N93IUx0CII7I51xr_Q";
});

api.addResponseTransform(response => {
	if (!response.ok) throw response.error;
});

export default api;
