import LoginPage from "../pages/Login";
import HomePage from "../pages/Home";
import VideoPage from "../pages/Video";

const publicRoutes = [
	{
		path: "/",
		component: LoginPage
	},
	{
		path: "/dashboard",
		component: VideoPage
	},
	{
		path: "/watch/:idVideo",
		component: VideoPage
	}
];

export {publicRoutes};
