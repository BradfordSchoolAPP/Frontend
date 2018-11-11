import React from 'react';
import { View, StyleSheet, TextInput, Text,TouchableHighlight } from 'react-native';
import Header from '../components/Header';





'use strict';
 

var FloatingLabel = require('react-native-floating-labels');

export default class LoginScreen extends React.Component {
  constructor(){
    super()

    this.state= {
      name:'',
      email:'',
      status:0,
    }

  }

  send(){


    fetch('http://192.168.0.107:3000/api/v1/users/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: this.state.name,
      email: this.state.email,
    }),
  }).then((response) => {
      this.status = response.status;
      let data;
      response.json().then(obj=>{
        data= obj;
        console.log(this.status);
        console.log(data);

        //return { statusCode, data };
        

      });
    })
    .then(res => {
    }).catch(error => {
      console.error(error);
    });

    if(this.status === 200){
      return () => this.props.navigation.navigate('Home')
    }
    
    
  }

  go(){
    return () => this.props.navigation.navigate('Home')  
  }
  

  /*
  .then(response => {
  const statusCode = response.status;
  let data;
  response.json().then(obj=>{
    data= obj;
    return { statusCode, data };
  });

})
.then(res => {
  console.log("reponse :", res); // <-------- i get a "promise"
 }).catch(error => {
  console.error(error);
  return { name: "network error", description: "" };
});
  

  */



  render() {
    return (
      <View style={styles.form}>
        <View style={styles.container}>
          <FloatingLabel 
            labelStyle={styles.labelInput}
            inputStyle={styles.input}
            style={styles.formInput}
            onChangeText={(value) => this.setState({email: value})}
            value = {this.state.email}
            >Email</FloatingLabel>
            
          <FloatingLabel 
              labelStyle={styles.labelInput}
              inputStyle={styles.input}
              style={styles.formInput}
              onChangeText={(value) => this.setState({name: value})}
              value = {this.state.name}
            >Contraseña</FloatingLabel>

          <TouchableHighlight
            style= {styles.bottom}
            onPress= {this.go()}
            //{() => this.props.navigation.navigate('Home')}
            >

            <Text style= {styles.text}>
              Entrar
            </Text>
          </TouchableHighlight>

          <View>
          </View>


        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  form:{
    flex:1,
    justifyContent: 'center',
    backgroundColor:'#36485f',
    paddingLeft:30,
    paddingRight:50,

  },
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#36485f',
  },
  labelInput: {
    color: 'white',
    fontSize: 15,
  },
  formInput: {    
    borderBottomWidth:0, 
    marginLeft: 20,
    borderColor: '#36485f', 
        
  },
  input: {
    borderWidth: 0,
    color:'#DCD8D7',
    fontSize:20,
    height:45,
  },
  bottom: {
    backgroundColor: "#31DC96",
    width: 100,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
    alignSelf:'center',
    marginVertical:25

  },
  text: {
    color: 'white',
    alignSelf: 'center',
    paddingTop:10,
  }
});
