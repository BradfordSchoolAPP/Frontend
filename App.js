import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppNavigator from './src/navigation/AppNavigator'

import Homepage from './src/components/HomePage'
import { createStackNavigator} from 'react-navigation';
import LoginScreen from './src/screens/LoginScreen'
import ApiKeys from './src/constants/ApiKeys';
import * as firebase from 'firebase';
import DetailsNew from './src/screens/DetailsNew'
import HomeScreen from './src/screens/HomeScreen'
import New from './src/components/New'


/*credentials build
Keystore password: 75cc1bcb2bb644f0b82f442cb9ed00b3
  Key alias:         QGp1bGlvc2VycmFuby9jZW50cm8tZGUtcGFkcmVz
  Key password:      4e065bb5508847d4bf19567f3e12cd76
*/

//ExponentPushToken[a3DUrNAo7GuhlbxNgOzxSv]
//

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





//prueba release
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
    details: {
      screen: DetailsNew,
      navigationOptions:{
        header:null
      },
    },
    new: {
      screen: New,
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
    initialRouteName: 'app',
  }
);


