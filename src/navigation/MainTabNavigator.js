
import { createStackNavigator} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import MyCoursesScreen from '../screens/MyCoursesScreen';
import BenefitsScreen from '../screens/BenefitsScreen';
import HomePage from '../components/HomePage'
import CreateNewScreen from '../screens/CreateNewScreen'

import { createDrawerNavigator} from 'react-navigation';


const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  navigationOptions: {
    headerLeft:  null
  }
};



const CalendarStack = createStackNavigator({
  Calendar: CalendarScreen,
});

CalendarStack.navigationOptions = {
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
    Calendar: {
      screen: CalendarScreen,
    },
    MyCourses:{
      screen: MyCoursesScreen,
    },
    Benefits:{
      screen: BenefitsScreen,
    },
    create:{
      screen: CreateNewScreen,
    }
  },
  {
    initialRouteName: 'Home',
    headerMode:'float',
    drawerOpenRoute: 'DrawerOpen',
    drawerPosition: 'left',
    drawerBackgroundColor:'#00796b',
    drawerWidth:200,
    contentOptions:{
      activeTintColor:'#06d0c7',
      inactiveTintColor:'white'

    }
  }

);
