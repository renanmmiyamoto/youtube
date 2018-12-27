import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import {test_email} from "../../utils/regex";
import {isAuthenticated} from "../../services/auth";

import "./style.scss";
import {do_register} from "./register";
import {logo, lock, user} from "../../images";

class RegisterPage extends Component {
	state = {
		newUser: {
			name: "",
			email: "",
			bornDate: "",
			avatar: "",
			password: ""
		},
		errorMessage: ""
	};

	handleFileState = e => {
		const file = e.target.files[0];

		this.setState({
			newUser: {
				...this.state.newUser,
				[e.target.id]: file
			}
		});
	};

	handleSubmit = async e => {
		e.persist();
		e.preventDefault();

		const {name, email, bornDate, avatar, password} = this.state.newUser;

		if (
			name === "" ||
			email === "" ||
			bornDate === "" ||
			avatar === "" ||
			password === ""
		) {
			this.setState({errorMessage: "Preencha corretamente os campos."});
			return;
		}

		if (!test_email.test(email.toLowerCase())) {
			this.setState({errorMessage: "E-mail inválido"});
			return;
		}

		if (password.length < 3) {
			this.setState({errorMessage: "Senha inválida"});
			return;
		}

		const register = await do_register(this.state.newUser);

		if (!register.ok) {
			this.setState({errorMessage: register.errorMessage});
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
					<form encType="multipart/form-data">
						<h2>Register your account</h2>

						<label>
							<img src={user} alt="Logo Youtube" />
							<input
								type="text"
								placeholder="Full Name"
								value={this.state.newUser.name}
								onChange={e =>
									this.setState({
										newUser: {
											...this.state.newUser,
											name: e.target.value
										}
									})
								}
							/>
						</label>

						<label>
							<img src={user} alt="Logo Youtube" />
							<input
								type="text"
								placeholder="E-mail"
								value={this.state.newUser.email}
								onChange={e =>
									this.setState({
										newUser: {
											...this.state.newUser,
											email: e.target.value
										}
									})
								}
							/>
						</label>

						<label>
							<img src={user} alt="Logo Youtube" />
							<input
								type="date"
								placeholder="Born Date"
								value={this.state.newUser.bornDate}
								onChange={e =>
									this.setState({
										newUser: {
											...this.state.newUser,
											bornDate: e.target.value
										}
									})
								}
							/>
						</label>

						<div className="file">
							<input
								type="file"
								id="avatar"
								value={this.state.newUser.avatar.name && ""}
								onChange={this.handleFileState.bind(this)}
							/>
							<label htmlFor="avatar">
								<img src={lock} alt="Logo Youtube" />
								<span>
									{this.state.newUser.avatar.length === 0
										? "Avatar"
										: this.state.newUser.avatar.name}
								</span>
							</label>
						</div>

						<label>
							<img src={lock} alt="Logo Youtube" />
							<input
								type="password"
								placeholder="Password"
								autoComplete="new-password"
								value={this.state.newUser.password}
								onChange={e =>
									this.setState({
										newUser: {
											...this.state.newUser,
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

export default RegisterPage;
