

import {createStackNavigator} from 'react-navigation'
import AppNavigator from './AppNavigator'
import Homepage from '../components/HomePage'
import DetailsNew from '../screens/DetailsNew'
import New from '../components/New'
import Logout from '../components/Logout';
import MainTabNavigator from '../navigation/MainTabNavigator'
import MainTabParents from './MainTabParents';
import RegisterScreen from '../screens/RegisterScreen';
import DetailEventScreen from '../screens/DetailEventScreen';
import EditBenefit from '../screens/EditBenefit';
import EditEvent from '../screens/EditEvent';
import DetailEvent from '../screens/DetailEventScreen';
import Benefit from '../components/Benefit';



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
      register:{
        screen: RegisterScreen,
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
      DetailEvent: {
        screen:DetailEventScreen,
        navigationOptions:{
          header:null
        },
      }, 
      EditEvent:{
        screen:EditEvent,
        navigationOptions:{
          header:null
        },
      },
      EditBenefit:{
        screen:EditBenefit,
        navigationOptions:{
          header:null
        },
      },
      Benefit:{
        screen:Benefit,
        navigationOptions:{
          header:null
        },
      }
    },
    {
      initialRouteName: authenticated? (admin? 'app':'appParent')
      :
        'home',
    }
  );