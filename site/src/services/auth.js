const isAuthenticated = () => {
	if (localStorage.getItem("@YOUTUBE:token") !== undefined) {
		return true;
	}
};

export {isAuthenticated};
