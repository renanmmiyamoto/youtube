import HomePage from "../pages/Home";
import VideoPage from "../pages/Video";

const publicRoutes = [
	{
		path: "/",
		component: HomePage
	},
	{
		path: "/watch/:idVideo",
		component: VideoPage
	}
];

export {publicRoutes};
