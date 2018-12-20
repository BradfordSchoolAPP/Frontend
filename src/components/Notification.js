import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableHighlight,
    Dimensions,
    Modal,
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
    
      prepareCallback() {
        let callbackResult = Promise.resolve([this.props.data.title,this.props.data.details])
        this.props.data.opened = true;
        this.props.callback(callbackResult)
      }



    render(){
        return(
            <TouchableHighlight underlayColor="transparent" onPress={() => this.prepareCallback()}>
                <View style={styles.container}>
                    <View style={styles.icon}>
                        <Image  style={{height:35, width: 35,alignSelf: 'stretch'}}
                            source={{uri:"https://img.icons8.com/ultraviolet/80/000000/urgent-message.png" }}
                        />
                    </View>
                    
                    <View style={styles.containerText}>
                        <Text style={[styles.textTitle , this.props.data.opened ? styles.IsOld : styles.IsNew]}>{this.props.data.title}</Text>
                        <Text  numberOfLines={1} style={styles.textDetail}>{this.props.data.details}</Text>
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
        marginTop:4,
    },
    
    textTitle:{
        fontSize:20,
        alignContent:'center',
        alignItems:'center',
        marginHorizontal:15,
        marginTop:5,
    },
    IsNew:{
        color:'black',
        fontWeight:"500",
    },
    IsOld:{
        color:"grey",
        fontWeight:"100",
    },
    textDetail:{
        color:'grey',
        fontSize:14,
        alignContent:'center',
        alignItems:'center',
        marginHorizontal:15,

    },
    containerText:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf:"flex-start",
        alignItems: 'stretch',
        marginHorizontal:55,
    },
    icon:{
        position: 'absolute',
        top: 15,
        left: 15,
    },


})