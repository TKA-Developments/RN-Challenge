import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from '../screens/Home';

const Navigator = createStackNavigator({
  Home: Home
}, {
  initialRouteName: 'Home',
  // defaultNavigationOptions: {
  //   title: "test"
  // }
})

export default createAppContainer(Navigator)