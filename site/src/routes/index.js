import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import {publicRoutes} from "./routes";

const Router = () => (
	<BrowserRouter>
		<Switch>
			{publicRoutes.map((route, i) => {
				return (
					<Route
						exact
						path={route.path}
						component={route.component}
						key={i}
					/>
				);
			})}
		</Switch>
	</BrowserRouter>
);

export default Router;
