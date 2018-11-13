import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableHighlight,
    Dimensions,
    ImageBackground
} from 'react-native'

import { LinearGradient } from 'expo';


const {width,height} = Dimensions.get('window')

import AppNavigator from '../navigation/AppNavigator'

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
            <View style={styles.container}> 
                <View>

                    <ImageBackground
                    style={styles.image}
                    blurRadius={1} 
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

                        <View style={styles.botones}>
                        <TouchableHighlight 
                            style={styles.login}
                            onPress={() => this.props.navigation.navigate('login')}>
                            
                            <Text style={styles.text}> Ingresar </Text>
                        </TouchableHighlight>

                        <TouchableHighlight style={styles.login}>
                            <Text style={styles.text}> Registro </Text>
                        </TouchableHighlight>
                        
                    </View>

                    </ImageBackground>


                </View>

            
            </View>

            
        )
    }
}

const styles = StyleSheet.create({


    container: {
        flex: 1,
    },
    image:{
        width:width,
        height:height,

    },
    botones:{
        marginVertical:height/2 + 100,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    login:{
        borderWidth:2,
        borderColor:"white",
        alignItems:'center',
        alignSelf:'center',
        justifyContent:'center',
        width:200,
        height:50,
        borderBottomColor:"white",
        backgroundColor:"transparent",
        borderRadius:20,
        marginVertical:5,
    },
    text:{
        color:"white",
        fontSize:18
    }
})


