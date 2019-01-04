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

import { Permissions, Notifications } from 'expo';

registerForPushNotificationsAsync = async () =>{
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    
    console.log( await Permissions.getAsync(Permissions.NOTIFICATIONS))
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Expo.Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
 
    }
  
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
        return;
    }
  
    // Get the token that uniquely identifies this device
 
    let token = await Notifications.getExpoPushTokenAsync();
    console.log(token)
    
}




export default class HomePage extends Component{

    constructor(props){
        super(props)
    
        this.state= {
          pass:'',
          email:'',
          status:0,
          showAlert: false,
          loading: true,
          confirm: false,
          message: ''
        }
    }

    componentWillMount(){
        console.log("acaaa")
        registerForPushNotificationsAsync();
        this.listener = Notifications.addListener(this.listen)
    }

    componentWillUnmount(){
        this.listener && Notifications.removeListener(this.listen)
    }

    listen = ({origin,data}) => {
        console.log("cool data", origin, data)
        console.log("origin: ", origin)
        console.log("type: ", data.json.type)
        if(origin == "selected"){
            //this.setState({loading:false, confirm:true, message:data.message})
            //this.showAlert()
              if(data.json.type === "noticia"){
                  {this.props.navigation.navigate('details',{
                      data: data.json,
                  })
                  }
              }
              else if(data.json.type === "alerta"){
                  {this.props.navigation.navigate('noti')}
              }
            
        }
    }


    async _validate(){
        /*if(this.state.pass === '' || this.state.email === ''){
            this.setState({loading:false, confirm:true, message:"Campos inválidos"})
            this.showAlert()
        }
        else{
            this.setState({loading:true, confirm:false, message:"Ingresando"})
            this.showAlert()
            await this.send()
        }*/
        {this.props.navigation.navigate('Home')}
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
        
        fetch('http://191.115.199.185/api/v1/parents/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email:this.state.email,
                password:this.state.pass
            }),
            }).then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.length === 0 ){
                    console.log("es null")
                    this.setState({loading:false, confirm:true, message:"Email o contraseña incorrecta"})
                    this.showAlert()
                }
                else{
                    console.log("no es null")
                    console.log(responseJson)
                    this.hideAlert()
                    {this.props.navigation.navigate('Home')}
                }
            })
            .catch((error) => {
                console.log("no hay conexion")
                
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
                                    placeholder = {'Correo electronico'}
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
                            showProgress={this.state.loading}
                            message={this.state.message}
                            closeOnTouchOutside={true}
                            closeOnHardwareBackPress={false}
                            //showCancelButton={true}
                            showConfirmButton={this.state.confirm}
                            cancelText="No, cancel"
                            confirmText="Aceptar"
                            confirmButtonColor="green"
                            style
                            onCancelPressed={() => {
                                
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
        color:'green',
        textShadowColor:'black',
        textShadowOffset: {width: 0.5, height: 0.5},
        textShadowRadius:0.8,
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


