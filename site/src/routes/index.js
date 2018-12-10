import React from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {isAuthenticated} from "../services/auth";

import {publicRoutes, privateRoutes} from "./routes";

const PrivateRoute = ({component: Component, ...rest}) => (
	<Route
		{...rest}
		render={props =>
			isAuthenticated() ? (
				<Component {...props} />
			) : (
				<Redirect to={{pathname: "/", state: {from: props.location}}} />
			)
		}
	/>
);

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

			{privateRoutes.map((route, i) => {
				return (
					<PrivateRoute
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
