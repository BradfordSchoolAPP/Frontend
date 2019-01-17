import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableHighlight,
    Image,
} from 'react-native'

import Moment from 'moment';
import 'moment/locale/es'

const fecha = new Date('2018-11-30');

const {width,height} = Dimensions.get('window')

export default class Benefit extends Component{
    constructor(props){
        super(props)
    }
_openDetail(){
    this.props.navigation.navigate('DetailEvent',{
        benefit:this.props.benefit,
    })
}
    render(){
        Moment.locale('es')
        console.log(this.props.id)
        return(
            <View style={styles.container}>
            <View style={styles.title}>
              <View style={[styles.center,{width:70}]}>
              <Image
                  style={{tintColor:"#29a184",width: 40, height: 40}}
                  source={{uri: 'https://img.icons8.com/material/1600/scholarship.png'}}
                />
              </View>
              <View>
                  <Text style={{fontSize: 26, color:'gray',fontStyle:'bold'}}>{this.props.benefit.name}</Text>
              </View>
            </View>
            <View style={{width: width-width*0.05,backgroundColor:'red'}}>
                <Text style={{fontSize:22,marginTop:10, marginHorizontal:15,color:'gray'}}>{this.props.benefit.details}</Text>
            </View>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        width:width-width*0.05,
        borderRadius:8,
        marginTop:width*0.025,
        alignItems:'center',
        alignSelf:"center",
    },
    center:{
        alignItems:'center',
        justifyContent: 'center',
        alignContent:'center',
      },
      title:{
        marginTop:width*0.025,
        alignItems:'center',
        alignSelf:"center",
        flexDirection: 'row',
    },
})

