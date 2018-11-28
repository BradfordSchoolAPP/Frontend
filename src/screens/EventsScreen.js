import React from 'react';
import { StyleSheet, 
  Text,
  TextInput,
  TouchableHighlight, 
  View, 
  Button,
  Dimensions, 
  ScrollView,
  Alert,
  Modal,
  Image} from 'react-native';

  import AppNavigator from '../navigation/AppNavigator';

import Icon from 'react-native-vector-icons/FontAwesome'
import AwesomeAlert from 'react-native-awesome-alerts';
import DatePicker from 'react-native-datepicker';
import Event from '../components/Event'
import Header from '../components/Header'

const {width,height} = Dimensions.get('window');

var FloatingLabel = require('react-native-floating-labels');

export default class EventsScreen extends React.Component {
  constructor(props){
    super(props)

    this.state= {
      title:'',
      detail: '',
      place: '',
      date:'',
      hour:'',
      json:[
        {
          title:'Navidad',
          detail:'se celebra la navidad aki',
          place:'Casa Javier',
          date:'2018-12-25',
          hour:'00:00'
        },
        {
          title:'Fin semestre',
          detail:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur ornare congue. Vivamus faucibus, urna et mattis maximus, ante lacus luctus sapien, sit amet feugiat metus tellus ac ligula. Phasellus mattis rutrum mattis. Suspendisse potenti. Nam laoreet imperdiet purus, et pulvinar dolor tincidunt id',
          place:'Universidad de Santiago',
          date:'2018-11-02',
          hour:'15:30'
        }],
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerleft: null,
      drawerLabel: 'Eventos',
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
      <View>
          <Header {...this.props} namePage="Eventos"/>
          <ScrollView style={{height:height*0.9}}>
          {this.state.json.map((item) => {
            console.log(item.title)
            return (
                  <Event 
                  key={item.title}
                  navigation={this.props.navigation}
                  title={item.title}
                  hour={item.hour}
                  place={item.place}
                  date={item.date}
                  detail={item.detail} 
                  dataJson={item}/>                     
            )})
          }
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  icon:{
    position:'absolute',
    marginVertical:2,
    left:60
  },
  textTitle:{
    color:'#00AD9C',
    fontSize:30,
    alignContent:'center',
    alignItems:'center',
    marginHorizontal:15,
    marginTop:5,
    marginBottom:10,
  },
  text:{
    fontSize:20,
    color:'white',
  },
  text2:{
    color: '#878787',
    fontSize: 20,
    marginLeft:22,
    marginTop:10,
  },
})