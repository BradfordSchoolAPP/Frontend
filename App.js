import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppNavigator from './src/navigation/AppNavigator'

import Homepage from './src/components/HomePage'
import { createStackNavigator} from 'react-navigation';
import LoginScreen from './src/screens/LoginScreen'
import ApiKeys from './src/constants/ApiKeys';
import * as firebase from 'firebase';
import HomeScreen from './src/screens/HomeScreen'


export default class App extends React.Component {

  constructor(props) {
    super(props);

    // Initialize firebase...
    if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }
  }

  
  render() {
    return <Stack />;

  }
}






const Stack= createStackNavigator(

  {
    app: {
      screen:AppNavigator,
      navigationOptions:{
        header:null
      },
    },
    home: {
      screen: Homepage,
      navigationOptions:{
        header:null
      },
    },
    login: {
      screen: LoginScreen,
      navigationOptions:{
        header:null
      },
    },
  },
  {
    initialRouteName: 'home',
  }
);


