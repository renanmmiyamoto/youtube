const isAuthenticated = () => {
	if (localStorage.getItem("@YOUTUBE:token") !== null) {
		return true;
	}
};

export {isAuthenticated};
