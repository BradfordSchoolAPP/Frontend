import React from 'react';
import { StyleSheet, Text,TouchableHighlight, View, Button,Dimensions, ScrollView,Image} from 'react-native';



import Icon from 'react-native-vector-icons/FontAwesome'

import Header from '../components/Header'

import Notification from '../components/Notification'

export default class NotificationsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerleft: null,
      drawerLabel: 'Notificaciones',
      drawerIcon:  
      <Icon
        name="inbox"
        color= "white"
        size={20} 
      />
    };
  };

  constructor(props) {
    super(props);
    console.ignoredYellowBox = [
      'Setting a timer'
      ];
    this.state = {
        alerts:[
            {
            title:"alerta 1",
            details:"detalles",
            date: "18 nov 2018"
            },
            {
            title:"alerta 2",
            details:"detalles2",
            date: "25 nov 2018"
            }],

      
    }
  }



  render(){
    return(
        <View style={styles.container}>
        <Header {...this.props} namePage="Notificaciones"/> 
        
        {this.state.alerts.map((item) => {
              console.log(item)
              return (
                    <Notification key={item.title} data={item}
                        navigation={this.props.navigation}
                        />
              )
        })}
        </View>
    );
  }
      

}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#E9E9EE',
  },
})