import React, {Component} from "react";
import Router from "./routes";
import "./App.scss";

class App extends Component {
	render() {
		return (
			<div className="App">
				<Router />
			</div>
		);
	}
}

export default App;
