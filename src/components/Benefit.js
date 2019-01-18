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
import 'moment/locale/es';
import AwesomeAlert from 'react-native-awesome-alerts';


const fecha = new Date('2018-11-30');

const {width,height} = Dimensions.get('window')

export default class Benefit extends Component{
    constructor(props){
        super(props)

        this.state= {
            showAlert: false,
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
_openDetail(){
    this.props.navigation.navigate('DetailEvent',{
        benefit:this.props.benefit,
    })
}
delete(){
    fetch('http://68.183.139.254/api/v1/scolarships', {
    method: 'delete',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        id:this.props.benefit.id
    }),
  });
}
    render(){
        Moment.locale('es')
        const {showAlert} = this.state;
        return(
            <View>
                <View style={styles.container}>
                <View style={styles.title}>
                <View style={[styles.center,{width:70}]}>
                <Image
                    style={{tintColor:"#29a184",width: 40, height: 40}}
                    source={{uri: 'https://img.icons8.com/material/1600/scholarship.png'}}
                    />
                </View>
                <View>
                    <Text style={{fontSize: 24, color:'#042e60',fontWeight:'bold'}}>{this.props.benefit.name}</Text>
                </View>
                </View>
                <View style={{width: width-width*0.05,marginBottom: 20}}>
                    <Text style={{fontSize:22,marginTop:10, marginHorizontal:15,color:'gray'}}>{this.props.benefit.details}</Text>
                    <View style={{marginHorizontal:15,marginVertical:10, width:80,borderBottomColor:"#29a184",borderBottomWidth:2}}>
                        <Text style={{fontSize: 22,color:"#042e60", marginVertical:2}}>Fechas</Text>
                    </View>
                    <View style={{marginHorizontal:15, flexDirection:'row'}}>
                        <Text style={{fontSize: 20,fontWeight:'bold' ,color:"gray", marginHorizontal: 2}}>Inicio:</Text>
                        <Text style={{fontSize:20,color:'gray'}}>{Moment(this.props.benefit.date).format('ddd DD')} de { Moment(this.props.benefit.date).format('MMMM, YYYY')}</Text>
                    </View>
                    <View style={{marginHorizontal:15, flexDirection:'row'}}>
                        <Text style={{fontSize: 20,fontWeight:'bold' ,color:"gray", marginHorizontal: 2}}>Fin:</Text>
                        <Text style={{fontSize:20,color:'gray'}}>{Moment(this.props.benefit.deadline_date).format('ddd DD')} de { Moment(this.props.benefit.deadline_date).format('MMMM, YYYY')}</Text>
                    </View>
                    <View style={{marginHorizontal:15, flexDirection:'row'}}>
                        <Text style={{fontSize: 20 ,color:"gray", marginHorizontal: 2}}>Hasta las </Text>
                        <Text style={{fontSize:20,color:'gray'}}>{this.props.benefit.deadline_hour} Horas</Text>
                    </View>
                    <View style={{marginHorizontal:15,marginVertical:10, width:120,borderBottomColor:"#29a184",borderBottomWidth:2}}>
                        <Text style={{fontSize: 22,color:"#042e60", marginVertical:2}}>Requisitos</Text>
                    </View>
                    {this.props.benefit.requeriments.map((item)=>{
                        return(
                            <Text style={{marginHorizontal:15,fontSize:20,color:'gray'}}>- {item}</Text>
                        )
                    })}
                    <View  style={[styles.center,{flexDirection:"row",marginTop:20}]}>
                        <TouchableHighlight style= {[styles.buttom,{marginRight:5}]} onPress={() => this.showAlert()}>
                            <Text style= {{fontSize:18,color:'gray',alignSelf: 'center',textAlign: 'center'}}>Eliminar</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style= {[styles.buttom,{marginLeft:5}]} onPress={() => this.showAlert()}>
                            <Text style= {{fontSize:18,color:'gray',alignSelf: 'center',textAlign: 'center'}}>Editar</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Precaución"
                message="¿Estás seguro de que desea eliminar?
                Una vez eliminado la beca, no podrá ver la información."
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Cancel"
                confirmText="Aceptar"
                confirmButtonColor="green"
                style
                onCancelPressed={() => {
                    this.hideAlert();
                }}
                onConfirmPressed={() => {
                    this.hideAlert();
                    this.delete();
                }}
                />
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
    buttom: {
        backgroundColor: "white",
        width: 100,
        height: 35,
        borderColor:'gray',
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: 'center',
        alignContent:"center",
        alignItems:"center"
      },
})

