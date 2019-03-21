import React from "react";
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import SplashPage from "./Splash";
import SettingPage from "./Settings";
import MainPage from "./Main";

const Settings = createStackNavigator({
  SettingPage
});

const Main = createStackNavigator({
  MainPage
});

export default createAppContainer(
  createSwitchNavigator({
    SplashPage,
    Settings,
    Main
  })
);
