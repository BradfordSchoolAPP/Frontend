import React from 'react';
import { StyleSheet, Text,TouchableHighlight, View,FlatList, Button,Dimensions, ScrollView,Image} from 'react-native';

import Header from '../components/Header'
import New from '../components/New'
import * as firebase from 'firebase';

import Icon from 'react-native-vector-icons/FontAwesome'
import Carousel, { Pagination } from 'react-native-snap-carousel';






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

  constructor(props) {
    super(props);
    console.ignoredYellowBox = [
      'Setting a timer'
      ];
    this.state = {
      url:null,
      /*
      json:[
        {
          img_num:3,
          img_dir:'1540831229393',
          title:'ALUMNA DE 6º BÁSICO OBTIENE TRES MEDALLAS EN COMPETENCIA INTERNACIONAL DE GIMNASIA',
          date:'12 de agosto 2018'
        },
        {
          img_num:4,
          img_dir:'1540913252877',
          title:'ALUMNOS LÍDERES DE VOLANDO EN V PARTICIPAN DE IMPORTANTE ENCUENTRO INTERESCOLAR',
          date:' 8 nov 2018'
        }],*/
        json:[],

      
    }
  }

  
  componentDidMount() {
    
    return fetch('http://191.115.226.55/api/v1/news')
    .then( (response) => response.json() )
    .then( (responseJson ) => {
      this.setState({
        json: responseJson,
      })
    })

    .catch((error) => {
      console.log(error)
    });
  }
  


  


 
  render(){ 
    
    return(
      <ScrollView style={styles.container}>
          <Header {...this.props} namePage="Noticias"/> 
      
          {this.state.json.map((item) => {
            console.log(item)
            return (
                <New key={item.title} dataJson={item}/>
            )
          })}

          

      </ScrollView>
    );
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
})