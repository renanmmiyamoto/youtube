import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';

class Main extends Component {
	static navigationOptions = {
		title: "CRUD"
	}

	state = {
		email: "",
		password: "",
		errorMessage: "",
	}

	doLogin = async () => {
		const {email, password} = this.state;

		const response = await api.post("auth/authenticate", {
			email, password
		});

		const {user, token} = response.data;

		AsyncStorage.multiSet([
			["@CRUD:token", token],
			["@CRUD:user", user],
		]);
	}

	render() {
		return (
			<View style={styles.container}>
				<TextInput
					autoCapitalize="none"
					style={styles.input}
					value={this.state.email}
					placeholder="E-mail"
					onChangeText={value => this.setState({email: value})}
				/>
				<TextInput
					autoCapitalize="none"
					style={styles.input}
					value={this.state.password}
					placeholder="Password"
					onChangeText={value => this.setState({password: value})}
				/>
				<TouchableOpacity style={styles.button} onPress={this.doLogin}>
					<Text style={styles.textButton}>Entrar</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},

	input: {
		width: "100%",
		fontSize: 16,
		color: "#333",
		textTransform: "lowercase",
		borderWidth: 1,
		borderColor: "#DA552F",
		borderRadius: 7,
		padding: 10,
		marginVertical: 5
	},

	button: {
		backgroundColor: "#DA552F",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 15,
		marginTop: 5,
		borderRadius: 7,
	},
	textButton: {
		color: "#fff",
		textTransform: "uppercase"
	}
});

export default Main;