import LoginPage from "../pages/Login";
import HomePage from "../pages/Home";
import VideoPage from "../pages/Video";
import ChannelPage from "../pages/Channel";
import UploadPage from "../pages/Upload";
import RegisterPage from "../pages/Register";

const publicRoutes = [
	{
		path: "/",
		component: LoginPage
	},
	{
		path: "/register",
		component: RegisterPage
	}
];

const privateRoutes = [
	{
		path: "/home",
		component: HomePage
	},
	{
		path: "/dashboard",
		component: VideoPage
	},
	{
		path: "/watch/:idVideo",
		component: VideoPage
	},
	{
		path: "/channel/:idUser",
		component: ChannelPage
	},
	{
		path: "/upload",
		component: UploadPage
	}
];

export {publicRoutes, privateRoutes};
