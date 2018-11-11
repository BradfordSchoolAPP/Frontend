import React from 'react';
import { StyleSheet, Text,TouchableHighlight, View, Button,Dimensions, ScrollView,Image} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'

import Header from '../components/Header'

export default class CalendarScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: 'Calendario',
      drawerIcon:  
      <Icon
        name="calendar"
        color= "white"
        size={20} 
      />
    };
  };

  render(){
    return(
        <View style={styles.container}>
        <Header {...this.props} namePage="Calendario"/> 
          
        </View>
    );
  }
      

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
})