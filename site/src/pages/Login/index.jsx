import React, {Component} from "react";
import {Link} from "react-router-dom";
import {do_login} from "./login";
import {email} from "../../utils/regex";

import "./style.scss";
import logo from "../../images/icons/youtube.svg";
import lock from "../../images/icons/lock.svg";
import user from "../../images/icons/user.svg";

class LoginPage extends Component {
	state = {
		user: {
			email: "",
			password: ""
		},
		errorMessage: ""
	};

	handleSubmit = () => {
		const {email, password} = this.state.user;
		if (email === "" || password === "") {
			this.setState({errorMessage: "Preencha corretamente os campos."});
		}
	};

	render() {
		return (
			<main className="login">
				<section className="left">
					<div className="logo">
						<img src={logo} alt="Logo Youtube" />
					</div>

					<h1>Welcome to the new Youtube</h1>
				</section>

				<section className="right">
					<form>
						<h2>Login to your account</h2>

						<label>
							<img src={user} alt="Logo Youtube" />
							<input
								type="text"
								placeholder="Username"
								value={this.state.user.email}
								onChange={e =>
									this.setState({
										user: {
											...this.state.user,
											email: e.target.value
										}
									})
								}
							/>
						</label>

						<label>
							<img src={lock} alt="Logo Youtube" />
							<input
								type="text"
								placeholder="Password"
								value={this.state.user.password}
								onChange={e =>
									this.setState({
										user: {
											...this.state.user,
											password: e.target.value
										}
									})
								}
							/>
						</label>

						<div className="actions">
							<button onClick={this.handleSubmit}>Login</button>

							<Link to="/forgot_password">Forgot Password?</Link>
						</div>
					</form>
				</section>
			</main>
		);
	}
}

export default LoginPage;
