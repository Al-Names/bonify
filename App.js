import React, { Component } from "react";
import {} from "react-native";

import { createStackNavigator, createAppContainer } from "react-navigation";

import Maps from "./src/screens/Maps";
import Videos from "./src/screens/Videos";

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const AppStackNavigator = createStackNavigator(
  {
    Home: Maps,
    Videos: Videos
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "black"
      }
    }
  }
);

const AppContainer = createAppContainer(AppStackNavigator);
