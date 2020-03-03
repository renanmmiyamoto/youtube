import { createStackNavigator } from "react-navigation";

import Main from "../screens/Main";
import ListProducts from "../screens/ListProducts";

export default createStackNavigator({
	Main,
	ListProducts
}, {
	navigationOptions: {
		headerStyle: {
			backgroundColor: "#DA552F"
		},
		headerTintColor: "#fff"
	}
});