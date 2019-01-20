import React from 'react';
import { StyleSheet, Text,TouchableHighlight, Linking,View, Button,Dimensions, ScrollView,Image} from 'react-native';



import Icon from 'react-native-vector-icons/FontAwesome'

import Header from '../components/Header'

export default class ContactScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    console.log("estoy en la vistaaaaaaaaaa contacto")
    return {
      headerleft: null,
      drawerLabel: 'Contacto',
      drawerIcon:  
      <Icon
        name="phone"
        color= "white"
        size={20} 
      />
    };
  };


  
  _handleOpenWithLinking = () => {
    Linking.openURL('mailto:support@example.com?subject=Mensaje a centro de padres') 
  }
  


  render(){
    return(
        <View style={styles.container}>
        <Header {...this.props} namePage="Contacto"/> 

            <View>
                <TouchableHighlight
                    underlayColor='transparent' 
                    style= {styles.bottom}
                    onPress={this._handleOpenWithLinking}
                >
                    <Text style= {styles.text}>
                        Enviar correo
                    </Text>
                
                </TouchableHighlight>
            </View>
        </View>
    );
  }
      

}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white',
  },
  bottom: {
    backgroundColor: "#29a184",
    width: 130,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: 'center',
    alignContent:"center",
    alignItems:"center",
    alignSelf:"center"
  },
  text: {
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center'
  },
})