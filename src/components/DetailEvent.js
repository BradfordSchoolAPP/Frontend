import React from 'react';
import { StyleSheet, Text,TouchableHighlight, View, Button,Dimensions, ScrollView,Image} from 'react-native';

import Header from '../components/Header'
import AppNavigator from '../navigation/AppNavigator'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class DetailEvent extends React.Component {
    constructor(props){
        super(props)
    
        this.state= {
          edit: false,
          json:[
            {
              titleEvent:'Navidad',
              detail:'se celebra la navidad aki',
              place:'Casa Javier',
              date:'25 de diciembre 2018',
              hour:'00:00'
            }],
        }
      }

  render(){
    return(
        <View style={styles.container}>
            <View style={styles.Header}>
                <Icon
                    style ={styles.icon}
                    name="angle-left"
                    color= "#009688"
                    size={20}
                />
            </View>
            
        </View>
    );
  }
      

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  icon: {
    paddingHorizontal:15,
    paddingVertical:100,
},
header:{
    backgroundColor:"white",
    height:70,
    alignItems: 'center',
    paddingTop: 20,
    flexDirection: 'row',
},
})