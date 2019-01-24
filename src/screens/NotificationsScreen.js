import React from 'react';
import { StyleSheet, Text,TouchableHighlight, View, Button,Dimensions, ScrollView,Image, AsyncStorage} from 'react-native';



import Icon from 'react-native-vector-icons/FontAwesome'

import Header from '../components/Header'
import AwesomeAlert from 'react-native-awesome-alerts';
import Notification from '../components/Notification'

import {
    SCLAlert,
    SCLAlertButton
  } from '../react-native-scl-alert'

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
      'Setting a timer','Warning: Each', 'Warning: Failed'
      ];
    this.state = {
        show: false,
        loading: false,
        confirm: false,
        userId: 0,
        title:'',
        message: '',

        alerts:[
            /*{
            title:"Alerta 1",
            details:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            date: "18 nov 2018",
            opened:false,
            },
            {
            title:"Alerta 2",
            details:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            date: "25 nov 2018",
            opened:true,
            },
            {
            title:"Alerta 3",
            details:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            date: "25 nov 2018",
            opened:false,
            }*/],

      
    }
  }

  async componentDidMount() {
    const user_id = await AsyncStorage.getItem('user_id').catch(e=> console.log(e))
    console.log(user_id)

    return fetch('http://68.183.139.254/api/v1/alerts/' + 10)
    .then( (response) => response.json() )
    .then( (responseJson ) => {
      this.setState({
        alerts: responseJson,
      })
    })

    .catch((error) => {
      console.log(error)
    });
  }
  

  Callback = (callback) => {
    callback.then((object,message) => {
      console.log("*************************************")
      console.log(object)
      console.log(message)
      this.setState({
        show: true,
        message:object[1],
        title:object[0]
      })
    }).catch((e) => console.log(e))
  }

  hideAlert = () => {
    this.setState({
        showAlert: false
    });
    };

    handleClose = () => {
        this.setState({ show: false })
      }


  render(){
    return(
        <View style={styles.container}>
        <Header {...this.props} namePage="Notificaciones"/> 
        
        {this.state.alerts.map((item,i) => {
              
              console.log(item)
              return (
                    <Notification key={i} data={item} callback={this.Callback}
                        navigation={this.props.navigation}
                        />
              )
        })}

        <SCLAlert
          onRequestClose={()=>console.log("cerrando")}
          theme="info"
          show={this.state.show}
          title={this.state.title}
          subtitle={this.state.message}
        >
          <SCLAlertButton theme="info" onPress={this.handleClose}>Hecho</SCLAlertButton>
        </SCLAlert>

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