import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableHighlight,
} from 'react-native'

import Moment from 'moment';
import 'moment/locale/es'

const fecha = new Date('2018-11-30');

const {width,height} = Dimensions.get('window')

export default class Event extends Component{
    constructor(props){
        super(props)
    }
_openDetail(){
    this.props.navigation.navigate('DetailEvent',{
        title: this.props.title,
        date: this.props.date,
        hour: this.props.hour,
        place: this.props.place,
        detail: this.props.detail
    })
}
    render(){
        Moment.locale('es')
        return(
            <TouchableHighlight  onPress={() => this._openDetail()}>
                  <View style={styles.container}> 
                    <View style={styles.date}>
                        <View style={styles.month}>
                            <Text style={styles.textMonth}>{Moment(this.props.date).format('MMM')}</Text>                        
                        </View>
                        <Text style={styles.textDate}>{Moment(this.props.date).format('DD')}</Text>
                    </View>
                    <View style={styles.containerText}>
                        <Text style={styles.textTitle}>{this.props.title}</Text>
                        <Text style={styles.text}>Hora: {this.props.hour}</Text>
                        <Text style={styles.text}>Lugar: {this.props.place}</Text>
                    </View>
                </View>
            </TouchableHighlight>   
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        paddingHorizontal:15,
        paddingVertical:100,

    },
    date:{
        backgroundColor:'white',
        height:height*0.15,
        width:width*0.25,
    },
    month:{
        backgroundColor:'white',
        height:height*0.05,
        width:width*0.23,
        marginHorizontal:1,
        borderBottomColor: '#A4A4A4',
        borderBottomWidth: 1,
    },
    container:{
        backgroundColor:'#FAFAFA',
        height:height*0.15,
        marginTop: height*0.005,
        flexDirection: 'row',
        marginHorizontal:5,
    },
    containerText:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    textTitle:{
        color:'#00AD9C',
        fontSize:24,
        alignContent:'center',
        alignItems:'center',
        marginHorizontal:15,
        marginTop:5,
    },
    text:{
        color:'#878787',
        fontSize:18,
        marginHorizontal:15,
    },
    textDate:{
        color:'#00AD9C',
        fontSize: 50,
        alignItems:'center',
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
    },
    textMonth:{
        color:'#878787',
        fontSize: 24,
        alignItems:'center',
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
    }
})

