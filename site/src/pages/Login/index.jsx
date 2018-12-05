import React, {Component} from "react";
import {Link} from "react-router-dom";

import logo from "../../images/icons/youtube.svg";

class LoginPage extends Component {
	render() {
		return (
			<main className="login">
				<section className="left">
					<img src={logo} alt="Logo Youtube" />

					<h1>Welcome to the new Youtube</h1>
				</section>

				<section className="right">
					<form>
						<h2>Login to your account</h2>

						<label>
							<img src={logo} alt="Logo Youtube" />
							<input type="text" placeholder="Username" />
						</label>

						<label>
							<img src={logo} alt="Logo Youtube" />
							<input type="text" placeholder="Username" />
						</label>

						<div className="actions">
							<button>Login</button>

							<Link to="/forgot_password">Forgot Password?</Link>
						</div>
					</form>
				</section>
			</main>
		);
	}
}

export default LoginPage;
