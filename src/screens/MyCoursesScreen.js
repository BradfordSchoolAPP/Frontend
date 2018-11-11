import React from 'react';
import { StyleSheet, Text,TouchableHighlight, View, Button,Dimensions, ScrollView,Image} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'

import Header from '../components/Header'

export default class MyCoursesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: 'Mis cursos',
      drawerIcon:  
      <Icon
        name="child"
        color= "white"
        size={20} 
      />
    };
  };

  render(){
    return(
        <View style={styles.container}>
          <Header {...this.props} namePage="Mis cursos"/> 
        </View>
    );
  }
      

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})