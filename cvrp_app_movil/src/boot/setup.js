import * as Expo from "expo";
import * as Font from 'expo-font';
import React, { Component } from "react";
import { StyleProvider } from "native-base";
import AppNavigator from "../AppNavigator";
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";


class Setup extends Component {

  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  
  componentWillMount() {
    this.loadFonts();

  }

  async loadFonts() {
    await Font.loadAsync({
      Roboto: require("../../node_modules/native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("../../node_modules/native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ isReady: true });
  }
  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading/>;
    }
    return (
          <AppNavigator/>
    );
  }
}

export default Setup
