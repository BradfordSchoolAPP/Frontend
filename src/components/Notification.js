import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableHighlight,
    Dimensions,
    Image
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
const {width,height} = Dimensions.get('window')
export default class Notification extends Component{

    constructor(props) {
        super(props);
        this.state = {
        }
      }

    render(){
        return(
            <TouchableHighlight onPress={() => console.log("presionado")}>
                <View style={styles.container}>
                    <View style={styles.containerText}>
                        <Text style={styles.textTitle}>{this.props.data.title}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({

    container:{
        backgroundColor:"white",
        width:width-6,
        height: 70,
        borderRadius:8,
        alignItems: 'center',
        alignSelf:"center",
        marginTop:5,

    },
    textTitle:{
        color:'black',
        fontSize:18,
        alignContent:'center',
        alignItems:'center',
        marginHorizontal:15,
        fontWeight:"bold",
        marginTop:5,
    },
    containerText:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf:"flex-start",
        alignItems: 'stretch',
    },



})