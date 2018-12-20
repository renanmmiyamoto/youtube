const filterFollowers = followers => {
	let label = "";

	if (followers > 1000000) {
		followers = followers / 1000000;
		label = `Inscritos ${followers} MI`;
	} else if (followers > 1000) {
		followers = followers / 1000;
		label = `Inscritos ${followers} Mil`;
	} else {
		label = `Inscritos ${followers}`;
	}

	return label;
};

export {filterFollowers};
