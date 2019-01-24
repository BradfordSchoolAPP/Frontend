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

    update(){
        fetch('http://68.183.139.254/api/v1/alerts/open', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.props.data.id
            })
        })
    }
    
    prepareCallback() {
        let callbackResult = Promise.resolve([this.props.data.title,this.props.data.details])
        if(!this.props.data.opened){
            this.update()
        }
        this.props.data.opened = true;
        this.props.callback(callbackResult)
    }

    formatDate(date) {
        var monthNames = [
          "Ene.", "Feb.", "Mar.",
          "Abr.", "Mayo", "Jun.", "Jul.",
          "Ago.", "Sep.", "Oct.",
          "Nov.", "Dic."
        ];
      
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
      
        return day  + " " + monthNames[monthIndex];
      }



    render(){
        var url
        if(!this.props.data.opened ){
            url = "https://img.icons8.com/ultraviolet/80/000000/urgent-message.png"
        }
        else{
            url = "https://img.icons8.com/ultraviolet/80/000000/open-envelope.png"
        }
        return(
            <TouchableHighlight underlayColor="transparent" onPress={() => this.prepareCallback()}>
                <View style={styles.container}>
                    <View style={styles.icon}>
                        <Image  style={{height:35, width: 35,alignSelf: 'stretch'}}
                            source={{uri:url}}
                        />
                    </View>
                    
                    <View style={styles.containerText}>
                        <Text style={[styles.textTitle , this.props.data.opened ? styles.IsOld : styles.IsNew]}>{this.props.data.title.replace(/\n|\r/g, "")}</Text>
                        <Text  style={styles.textDate}>{this.formatDate(new Date(this.props.data.date))}</Text>
                        
                    </View>

                    <View style={styles.containerText}>
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
        fontSize:22,
        alignContent:'center',
        alignItems:'center',
        marginHorizontal:15,
        marginTop:10,
    },
    IsNew:{
        color:'black',
        fontWeight:"bold",
    },
    IsOld:{
        color:"black",
        fontWeight:"100",
    },
    textDetail:{
        color:'grey',
        fontSize:16,
        alignContent:'center',
        alignItems:'center',
        marginHorizontal:15,
        marginTop:5,

    },
    textDate:{
        color:'grey',
        marginTop:14,
        fontSize:16,

    },
    containerText:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf:"flex-start",
        alignItems: 'stretch',
        marginHorizontal:55,
        width:width - 70
    },
    icon:{
        position: 'absolute',
        top: 15,
        left: 15,
    },


})