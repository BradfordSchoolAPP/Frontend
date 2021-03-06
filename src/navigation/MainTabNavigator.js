
import { createStackNavigator} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import MyCoursesScreen from '../screens/MyCoursesScreen';
import BenefitsScreen from '../screens/BenefitsScreen';
import HomePage from '../components/HomePage';
import EventsScreen from '../screens/EventsScreen';
import Event from '../components/Event';
import DetailEventScreen from '../screens/DetailEventScreen';
import AddEventScreen from '../screens/AddEventScreen';
import CreateNewScreen from '../screens/CreateNewScreen'

import { createDrawerNavigator} from 'react-navigation';

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




export default createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
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
    create:{
      screen: CreateNewScreen,
    },
    AddEvent:{
      screen: AddEventScreen,
    },
  },
  {
    initialRouteName: 'Home',
    headerMode:'float',
    drawerOpenRoute: 'DrawerOpen',
    drawerPosition: 'left',
    drawerBackgroundColor:'#042e60',
    drawerWidth:200,
    contentOptions:{
      activeTintColor:'#06d0c7',
      inactiveTintColor:'white'

    }
  }
);
