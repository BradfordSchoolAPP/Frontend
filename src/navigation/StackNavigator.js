

import {createStackNavigator} from 'react-navigation'
import AppNavigator from './AppNavigator'
import Homepage from '../components/HomePage'
import DetailsNew from '../screens/DetailsNew'
import New from '../components/New'
import Logout from '../components/Logout';
import MainTabNavigator from '../navigation/MainTabNavigator'
import MainTabParents from './MainTabParents';



export default StacknNavigator= (authenticated, admin)=>createStackNavigator(

    {
      app: {
        screen:MainTabNavigator(admin),
        navigationOptions:{
          header:null
        },
      },
      appParent:{
        screen:MainTabParents(admin),
        navigationOptions:{
          header:null
        },
      },
      logout:{
        screen: Logout,
        navigationOptions:{
          header:null
        }
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
    },
    {
      initialRouteName: authenticated? (admin? 'app':'appParent')
      :
        'home',
    }
  );