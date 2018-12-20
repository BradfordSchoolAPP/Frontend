import React from 'react';
import { StyleSheet, Text,TouchableHighlight, View, Button,Dimensions, ScrollView,Image} from 'react-native';



import Icon from 'react-native-vector-icons/FontAwesome'

import Header from '../components/Header'
import AwesomeAlert from 'react-native-awesome-alerts';
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
        showAlert: false,
        loading: false,
        confirm: false,
        title:'',
        message: '',

        alerts:[
            {
            title:"alerta 1",
            details:"orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            date: "18 nov 2018",
            opened:false,
            },
            {
            title:"alerta 2",
            details:"orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            date: "25 nov 2018",
            opened:true,
            },
            {
            title:"alerta 3",
            details:"orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            date: "25 nov 2018",
            opened:false,
            }],

      
    }
  }

  Callback = (callback) => {
    callback.then((object,message) => {
      console.log("*************************************")
      console.log(object)
      console.log(message)
      this.setState({
        showAlert: true,
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


  render(){
    return(
        <View style={styles.container}>
        <Header {...this.props} namePage="Notificaciones"/> 
        
        {this.state.alerts.map((item) => {
              
              console.log(item)
              return (
                    <Notification key={item.title} data={item} callback={this.Callback}
                        navigation={this.props.navigation}
                        />
              )
        })}

        <AwesomeAlert
            show={this.state.showAlert}
            showProgress={this.state.loading}
            title={this.state.title}
            message={this.state.message}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            cancelText="No, cancel"
            confirmText="Aceptar"
            confirmButtonColor="#29a184"
            style
            onCancelPressed={() => 
                this.hideAlert()
            }
            onConfirmPressed={() => 
                this.hideAlert()
            }
            />


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