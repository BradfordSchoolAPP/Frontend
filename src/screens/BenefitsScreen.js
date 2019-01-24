import React from 'react';
import { StyleSheet, Text,TouchableHighlight, View, Button,Dimensions, ScrollView,Image} from 'react-native';



import Icon from 'react-native-vector-icons/FontAwesome'

import Header from '../components/Header'
import Benefit from '../components/Benefit'

const {width,height} = Dimensions.get('window')

export default class BenefitsScreen extends React.Component {
  constructor(props){
    super(props)

    this.state= {
        json:[],
    }
  }
  componentDidMount() {
    this.getBenefits()
  }
  getBenefits(){
    return fetch('http://68.183.139.254/api/v1/scolarships')
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

  static navigationOptions = ({ navigation }) => {
    return {
      headerleft: null,
      drawerLabel: 'Becas',
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
          <Header {...this.props} namePage="Becas"/> 
          <ScrollView style={{height:height*0.9}}>
          {this.state.json.map((item) => {
            console.log(item.id)
            return (
                  <Benefit benefit={item} navigation={this.props.navigation} deleteCallback={this.getBenefits.bind(this)}/>                     
            )})
          }
          </ScrollView>
        </View>
    );
  }
      

}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  center:{
    alignItems:'center',
    justifyContent: 'center',
    alignContent:'center',
  },
})