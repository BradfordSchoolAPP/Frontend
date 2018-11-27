import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableHighlight,
    Dimensions,
    ImageBackground,
    TextInput,
    KeyboardAvoidingView
} from 'react-native'

import { LinearGradient } from 'expo';

const {width,height} = Dimensions.get('window')

import AppNavigator from '../navigation/AppNavigator'
import Icon from 'react-native-vector-icons/FontAwesome'

import AwesomeAlert from 'react-native-awesome-alerts';






export default class HomePage extends Component{

    constructor(){
        super()
    
        this.state= {
          pass:'',
          email:'',
          status:0,
          showAlert: false,
          object:null
        }
    }

    async _validate(){
        if(this.state.pass === '' || this.state.email === ''){
            this.showAlert()
        }
        else{
            await this.send()
            if(this.state.object === null){
                console.log("aklsjasdljads")
            }
            else{
                console.log("object:" + this.state.object)
                
            }
        }
    }

    showAlert = () => {
        this.setState({
          showAlert: true
        });
      };
     
    hideAlert = () => {
        this.setState({
            showAlert: false
        });
    }

    send(){
        fetch('191.115.4.254/api/v1/parents/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username:this.state.email,
            password:this.state.pass
        }),
      }).then((response) => response.json())
        .then((responseJson) => {
            if(responseJson === null){
                console.log("es null")
            }
            else{
                console.log("no es null")
                console.log(responseJson)
                {this.props.navigation.navigate('Home')}
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }



 

    render(){
        const {showAlert} = this.state;

            return(
                <KeyboardAvoidingView
                    behavior="padding"
                    style={{flex:1}}
                    >
                <ImageBackground
                    style={styles.container}
                    blurRadius={1.5} 
                    source={require('../images/fondo1.jpg')}
                    >

                    <LinearGradient
                        colors={['transparent','rgba(0,0,0,0.8)']}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            height:height,
                        }}
                    />

                    
                    <KeyboardAvoidingView
                        style={{flex:1}}
                    >
                        <View>
                            <Text style={styles.title}>Bienvenidos</Text>
                            <Text style={styles.subtitle}>Centro de Padres Colegio Bradford</Text>
                        </View>

                    </KeyboardAvoidingView>

                        <View style={styles.form}>
                            <Icon name="user" size={26} color="white" style={styles.inputIcon}/>
                            <TextInput
                                    style={styles.input}
                                    placeholder = {'Nombre de usuario'}
                                    placeholderTextColor = {'rgba(250,250,250,0.7)'}
                                    underlineColorAndroid = {'transparent'}
                                    keyboardType = 'default'
                                    onChangeText={(value) => this.setState({email: value})}
                                /> 
                        </View>
                        <View style={styles.form}>
                            <Icon name="lock" size={26} color="white" style={styles.inputIcon}/>
                            <TextInput
                                    style={styles.input}
                                    placeholder = {'Contraseña'}
                                    placeholderTextColor = {'rgba(250,250,250,0.7)'}
                                    underlineColorAndroid = {'transparent'}
                                    secureTextEntry = {true}
                                    keyboardType = 'default'
                                    onChangeText={(value) => this.setState({pass: value})}
                                    
                                /> 
                        </View>
                        <View style={styles.botones}>
                            <TouchableHighlight 
                                style={styles.login}
                                //onPress={() => this.props.navigation.navigate('login')}
                                onPress={() => this._validate()}
                                >
                                
                                <Text style={styles.text}> Ingresar </Text>
                            </TouchableHighlight>

                            <TouchableHighlight style={styles.registro}>
                                <Text style={styles.text}> Registro </Text>
                            </TouchableHighlight> 
                        </View>

                        


                    
                    </ImageBackground> 
                    <AwesomeAlert
                            show={showAlert}
                            showProgress={false}
                            //title="Precaución"
                            message="Campos inválidos"
                            closeOnTouchOutside={true}
                            closeOnHardwareBackPress={false}
                            //showCancelButton={true}
                            showConfirmButton={true}
                            cancelText="No, cancel"
                            confirmText="Aceptar"
                            confirmButtonColor="green"
                            style
                            onCancelPressed={() => {
                                this.hideAlert();
                            }}
                            onConfirmPressed={() => {
                                this.hideAlert();
                            }}
                    />
                </KeyboardAvoidingView> 
                
            )
        }
        
}

const styles = StyleSheet.create({


    container: {
        flex: 1,
        alignItems: "stretch",
        padding: 30
    },
    form: {
        alignItems: "stretch",
        padding:15,
        marginBottom:-10,
    },
    title: {
        color:'#298359',
        textShadowColor:'#171717',
        textShadowOffset: {width: 0.5, height: 0.5},
        textShadowRadius:0.5,
        fontSize:52,
        textAlign:"center",
        fontWeight:"bold",
        marginTop:height/6
    },
    subtitle: {
        color:"white",
        fontSize:30,
        textShadowColor:'#171717',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius:3,
        textAlign:"center",
        marginBottom:25
    },
    input:{
        width:width*0.75,
        height:40,
        fontSize:18,
        marginBottom: 10,
        paddingLeft: 44,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        color:'rgba(250,250,250,0.7)'
    },
    inputIcon:{
        position:'absolute',
        top:20,
        left:30
    },
    text:{
        color:"white",
        fontSize:18
    },
    login:{
        alignItems:'center',
        alignSelf:'center',
        justifyContent:'center',
        width:width*0.75,
        height:40,
        backgroundColor:"#3CA53D",
        opacity: 10,
        borderRadius:15,
        marginVertical:5,
    },
    registro:{
        alignItems:'center',
        alignSelf:'center',
        justifyContent:'center',
        width:width*0.75,
        height:40,
        borderWidth:1,
        borderColor:"white",
        backgroundColor:"transparent",
        borderRadius:15,
        marginVertical:5,
    },
    botones:{
        marginTop:30,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: "stretch",
    }
})


