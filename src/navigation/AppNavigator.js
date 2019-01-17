import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import DetailEventScreen from '../screens/DetailEventScreen';
import EditEvent from '../screens/EditEvent';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  DetailEvent: DetailEventScreen,
  EditEvent: EditEvent,
});