import React from "react";
import {
  StyleSheet,
  View,
  AsyncStorage,
  Image,
  Dimensions
} from "react-native";

const { width, height } = Dimensions.get("window");

export default class Splash extends React.Component {
  componentWillMount() {
    this.reloadedApp();
  }
  async reloadedApp() {
    const relaseDate = await AsyncStorage.getItem("relaseDate");
    if (relaseDate) {
      this.props.navigation.navigate("Main");
    } else {
      this.props.navigation.navigate("Settings");
    }
  }
  render() {
    return (
      <View>
        <Image
          resizeMode="contain"
          style={{ width: width, height: height }}
          source={require("./assets/splash.png")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
