import {create} from "apisauce";

const api = create({
	baseURL: "http://localhost:3000"
});

api.addRequestTransform(request => {
	request.headers.authorization =
		"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMDU1NjFiNGFhYWI0NDNlYzRjMzBmNCIsImlhdCI6MTU0Mzk0MDI1OCwiZXhwIjoxNTQ0MDI2NjU4fQ.CNcyEjaRedi8frL8UcGL2BwY16FCLw3y6zUusKAGXU0";
});

api.addResponseTransform(response => {
	if (!response.ok) throw response.error;
});

export default api;
