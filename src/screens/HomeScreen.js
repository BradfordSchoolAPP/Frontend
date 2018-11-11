import React from 'react';
import { StyleSheet, Text,TouchableHighlight, View, Button,Dimensions, ScrollView,Image} from 'react-native';

import Header from '../components/Header'

import Icon from 'react-native-vector-icons/FontAwesome'

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: 'Noticias',
      drawerIcon:  
      <Icon
        name="newspaper-o"
        color= "white"
        size={20} 
      />
    };
  };





  render(){
    return(
        <View style={styles.container}>
            <Header {...this.props} namePage="Noticias"/> 
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