import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import DetailEventScreen from '../screens/DetailEventScreen';
import EditEvent from '../screens/EditEvent';
import EditBenefit from '../screens/EditBenefit';
import Benefit from'../components/Benefit';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  DetailEvent: DetailEventScreen,
  Benefit: Benefit,
  EditEvent: EditEvent,
  EditBenefit: EditBenefit,
});