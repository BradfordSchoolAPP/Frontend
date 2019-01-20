

import React, {PureComponent} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableHighlight,
    Dimensions,
    ImageBackground,
    TextInput,
    KeyboardAvoidingView,
    AsyncStorage
} from 'react-native'

const {width,height} = Dimensions.get('window')
import Icon from 'react-native-vector-icons/FontAwesome'

import {connect} from 'react-redux'

class Logout extends PureComponent{

    constructor(props) {
        super(props);
        this.attempLogout = this.attempLogout.bind(this)
    }

    attempLogout(){
        this.props.authLogout();
    }
    
    render(){

        return(
            <View style={{flex:1,flexDirection: 'row',position:"absolute",top:height-50,left:30 }}>

                <TouchableHighlight underlayColor="transparent" onPress={this.attempLogout}>
                    <Icon name="power-off" color= "white" size={20} />
                </TouchableHighlight>

                <TouchableHighlight underlayColor="transparent" style={{width:150, height:30}}onPress={() => console.log("aslkdjasd")}>
                    <Text style={{color:"white", left:20 , fontWeight:"bold" }}>
                        Cerrar sesión
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    return {}
}

export const actionCreator = (type, payload = null) => ({type,payload})

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        authLogout:()=> {
            AsyncStorage.multiRemove(['token','authenticated','user_type','user_id'])
            dispatch(actionCreator('LOGGOUT'))
        }
    }
}

export const authStateReducer = (state={app_stated:false,authenticated:false},{type,payload}) => {
    switch(type){
        case 'LOGIN_SUCCESS':
            return {...state, authenticated:true}
        case 'LOGGOUT':
            return {...state, authenticated:false}
        case 'APP_LOADED':
            return {...state, app_started:true}
        default:
            return state

    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Logout)
