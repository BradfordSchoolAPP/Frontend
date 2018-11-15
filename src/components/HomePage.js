import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableHighlight,
    Dimensions,
    ImageBackground,
    TextInput
} from 'react-native'

import { LinearGradient } from 'expo';

const {width,height} = Dimensions.get('window')

import AppNavigator from '../navigation/AppNavigator'
import Icon from 'react-native-vector-icons/FontAwesome'

/*
<TouchableHighlight 
                    style={styles.login}
                    onPress={() => this.props.navigation.navigate('login')}
                    >
                        <Text> Ingresar </Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.login}>
                        <Text> Registro </Text>
                    </TouchableHighlight>
 */ 

export default class HomePage extends Component{


    render(){
        return(
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
                    <View>
                        <Text style={styles.title}>Bienvenidos</Text>
                        <Text style={styles.subtitle}>Centro de Padres Colegio Bradford</Text>
                    </View>
                    <View style={styles.form}>
                        <Icon name="user" size={26} color="white" style={styles.inputIcon}/>
                        <TextInput
                                style={styles.input}
                                placeholder = {'Correo electronico'}
                                placeholderTextColor = {'rgba(250,250,250,0.7)'}
                                underlineColorAndroid = {'transparent'}
                                keyboardType = 'email-address'
                            /> 
                    </View>
                    <View style={styles.form}>
                        <Icon name="lock" size={26} color="white" style={styles.inputIcon}/>
                        <TextInput
                                style={styles.input}
                                placeholder = {'Contraseña'}
                                placeholderTextColor = {'rgba(250,250,250,0.7)'}
                                underlineColorAndroid = {'transparent'}
                                secureTextEntry ={true}
                                keyboardType = 'visible-password'
                            /> 
                    </View>
                    <View style={styles.botones}>
                        <TouchableHighlight 
                            style={styles.login}
                            onPress={() => this.props.navigation.navigate('login')}>
                            
                            <Text style={styles.text}> Ingresar </Text>
                        </TouchableHighlight>

                        <TouchableHighlight style={styles.registro}>
                            <Text style={styles.text}> Registro </Text>
                        </TouchableHighlight> 
                    </View>
                </ImageBackground>     
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


