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
      details: '',
      place: '',
      date:'',
      hour:'',
      json:[],
    }
  }
  componentDidMount() {
    
    return fetch('http://68.183.139.254/api/v1/events')
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
            console.log(item.id)
            return (
                  <Event 
                  key={item.title}
                  navigation={this.props.navigation}
                  id={item.id}
                  title={item.title}
                  hour={item.hour}
                  place={item.place}
                  date={item.date}
                  details={item.details} 
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