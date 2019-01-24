
import { createStackNavigator, DrawerItems, AsyncStorage} from 'react-navigation';
import React from 'react'
import {View, Text, TouchableHighlight, Dimensions} from 'react-native'


import Icon from 'react-native-vector-icons/FontAwesome'

import HomeScreen from '../screens/HomeScreen';
import MyCoursesScreen from '../screens/MyCoursesScreen';
import BenefitsScreen from '../screens/BenefitsScreen';
import HomePage from '../components/HomePage';
import EventsScreen from '../screens/EventsScreen';
import Event from '../components/Event';
import DetailEventScreen from '../screens/DetailEventScreen';
import AddEventScreen from '../screens/AddEventScreen';
import CreateNewScreen from '../screens/CreateNewScreen'
import SendAlert from '../screens/SendAlert';
import { createDrawerNavigator} from 'react-navigation';
import NotificationsScreen from '../screens/NotificationsScreen';
import AddBenefitScreen from '../screens/AddBenefitScreen';
import ContactScreen from '../screens/ContactScreen';

const AddBenefitStack = createStackNavigator({
  AddBenefit:AddBenefitScreen,
});

AddBenefitStack.navigationOptions = {
 navigationOptions: {
   headerLeft: null
 }
};

import Logout from '../components/Logout'

const {width,height} = Dimensions.get('window')

const AddEventStack = createStackNavigator({
  AddEvent:AddEventScreen,
});

AddEventStack.navigationOptions = {
 navigationOptions: {
   headerLeft: null
 }
};

const DetailEventStack = createStackNavigator({
  DetailEvent: {screen: DetailEventScreen},
});
DetailEventStack.navigationOptions = {
  navigationOptions: {
    headerLeft:  null
  }
};
const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  navigationOptions: {
    headerLeft:  null
  }
};

const EventsStack = createStackNavigator({
  Events: EventsScreen,
});

EventsStack.navigationOptions = {
  navigationOptions: {
    headerLeft: null
  }
};

const MyCoursesStack = createStackNavigator({
  MyCourses: MyCoursesScreen,
});

MyCoursesStack.navigationOptions = {
  navigationOptions: {
    headerLeft: null
  }
};

const BenefitssStack = createStackNavigator({
  Benefits: BenefitsScreen,
});

BenefitssStack.navigationOptions = {
  navigationOptions: {
    headerLeft: null
  }
};

const homePageStack = createStackNavigator({
   HomeP:HomePage,
});

homePageStack.navigationOptions = {
  navigationOptions: {
    headerLeft: null
  }
};

const createNewStack = createStackNavigator({
  create:CreateNewScreen,
});

createNewStack.navigationOptions = {
  navigationOptions: {
    headerLeft:null
  }
};

const SendAlertStack = createStackNavigator({
  send:SendAlert,
})

SendAlertStack.navigationOptions = {
  navigationOptions: {
    headerLeft:null
  }
};

const NotificationStack = createStackNavigator({
  noti:NotificationsScreen,
})

NotificationStack.navigationOptions = {
  navigationOptions: {
    headerLeft:null
  }
};
  

const contactStack = createStackNavigator({
  contact: ContactScreen,
})

contactStack.navigationOptions = {
  navigationOptions:{
    headerLeft:null
  }
}



 

export default MainTabNavigator= (admin) => createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        drawerLabel:'Noticias',
        drawerIcon: 
        <Icon
          name="newspaper-o"
          color= "white"
          size={20} 
        />
      },
    },
    Events:{
      screen: EventsScreen,
    },
   
    MyCourses:{
      screen: MyCoursesScreen,
    },
    Benefits:{
      screen: BenefitsScreen,
    },
    noti:{
      screen: NotificationsScreen,
    },
    
    contact:{
      screen: ContactScreen
    },

    create:{
      screen: CreateNewScreen,
    },
    AddEvent:{
      screen: AddEventScreen,
    },
    AddBenefit:{
      screen:AddBenefitScreen,
    },
    send:{
      screen: SendAlert,
    }
  },
  { 
    
    contentComponent: (props) => (
      <View style={{flex:1, paddingTop:25, backgroundColor:"#042e60"}}>
      
        <DrawerItems  activeTintColor='#06d0c7' inactiveTintColor='white' {...props}/>
        

        <Logout {...props}/>
        
      </View>
    

  )},
);


