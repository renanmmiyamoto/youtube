import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import {test_email} from "../../utils/regex";
import {isAuthenticated} from "../../services/auth";

import "./style.scss";
import {do_login} from "./login";
import {logo, lock, user} from "../../images";

class LoginPage extends Component {
	state = {
		user: {
			email: "",
			password: ""
		},
		errorMessage: ""
	};

	handleSubmit = async e => {
		e.persist();
		e.preventDefault();

		const {email, password} = this.state.user;

		if (email === "" || password === "") {
			this.setState({errorMessage: "Preencha corretamente os campos."});
			return;
		}

		if (!test_email.test(email.toLowerCase())) {
			this.setState({errorMessage: "E-mail inválido"});
			return;
		}

		if (password.length < 3) {
			this.setState({errorMessage: "Senha inválido"});
			return;
		}

		const login = await do_login(this.state.user);

		if (!login.ok) {
			this.setState({errorMessage: login.errorMessage});
			return;
		} else {
			this.setState({errorMessage: ""});
			return <Redirect to="/home" />;
		}
	};

	render() {
		if (isAuthenticated()) {
			return <Redirect to="/home" />;
		}

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
								type="password"
								placeholder="Password"
								autoComplete="new-password"
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

						{this.state.errorMessage && (
							<p className="errorMessage">
								{this.state.errorMessage}
							</p>
						)}

						<div className="actions">
							<button onClick={e => this.handleSubmit(e)}>
								Login
							</button>

							<Link to="/forgot_password">Forgot Password?</Link>
						</div>
					</form>
				</section>
			</main>
		);
	}
}

export default LoginPage;
