import React from 'react';
import { StyleSheet, Text,TouchableHighlight, View, Button,Dimensions,TouchableWithoutFeedback, ScrollView,Image} from 'react-native';

import Header from '../components/Header'
import AppNavigator from '../navigation/AppNavigator'
import Icon from 'react-native-vector-icons/FontAwesome'
import Moment from 'moment';
import 'moment/locale/es'
import AwesomeAlert from 'react-native-awesome-alerts';

const {width,height} = Dimensions.get('window');

export default class DetailEvent extends React.Component {
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

    delete(){
        fetch('http://68.183.139.254/api/v1/events', {
        method: 'delete',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id:this.props.navigation.getParam('id')
        }),
      });
    }
    _openEdit(){
        console.log("el titulo a editar es" + this.props.navigation.getParam('title'))
        this.props.navigation.navigate('EditEvent',{
            id: this.props.navigation.getParam('id'),
            title: this.props.navigation.getParam('title'),
            date: this.props.navigation.getParam('date'),
            hour: this.props.navigation.getParam('hour'),
            place: this.props.navigation.getParam('place'),
            details: this.props.navigation.getParam('details')
        })
    }
    

    _openEdit(){
        console.log("el titulo a editar es" + this.props.navigation.getParam('title'))
        this.props.navigation.navigate('EditEvent',{
            id: this.props.navigation.getParam('id'),
            title: this.props.navigation.getParam('title'),
            date: this.props.navigation.getParam('date'),
            hour: this.props.navigation.getParam('hour'),
            place: this.props.navigation.getParam('place'),
            details: this.props.navigation.getParam('details')
        })
    }


  render(){
    Moment.locale('es')
    const {showAlert} = this.state;
    return(
        <View style={styles.container}>
            <View style={styles.containerHeader}> 
                    <TouchableWithoutFeedback
                        onPress={() => {
                        const { navigate } = this.props.navigation.navigate('Events');
                        }
                    }>
                        <Icon
                            style ={styles.icon}
                            name="angle-left"
                            color= "white"
                            size={20}
                        />
                    </TouchableWithoutFeedback>
                        
                    <Text style={styles.text4}>
                        Detalle Evento
                    </Text>                    
            </View>
            <View style={{ alignContent: 'center',alignItems:'center'}}>
                <Text style={styles.textTitle}>{this.props.navigation.getParam('title', 'No existe evento')}</Text>
            </View>
            <View style={{backgroundColor:'#E9E9EE',flex:1}}>
                <View style={styles.detailContainer}>
                    <View style={{ borderBottomColor: '#bbb',borderBottomWidth: StyleSheet.hairlineWidth,}}>
                        <Icon name="calendar" size={22} color="gray" style={styles.icon2}/>
                        {console.log("voy a imprimir como se ve la fecha: "+ this.props.navigation.getParam('date', '...'))}
                        <Text style={styles.text}>{Moment(this.props.navigation.getParam('date', '...')).format('ddd DD')} de { Moment(this.props.navigation.getParam('date', '...')).format('MMMM, YYYY')}
                        </Text>
                    </View>
                    <View style={{ borderBottomColor: '#bbb',borderBottomWidth: StyleSheet.hairlineWidth,}}>
                        <Icon name="clock-o" size={22} color="gray" style={styles.icon2}/>
                        <Text style={styles.text}>{this.props.navigation.getParam('hour', '...')}</Text>
                    </View>
                    <View style={{ borderBottomColor: '#bbb',borderBottomWidth: StyleSheet.hairlineWidth,}}>
                        <Icon name="map-marker" size={22} color="gray" style={styles.icon2}/>
                        <Text style={styles.text}>{this.props.navigation.getParam('place', '...')}</Text>
                    </View>
                    <View style={{ borderBottomColor: '#bbb',borderBottomWidth: StyleSheet.hairlineWidth,}}>
                        <Text style={styles.text2}>Detalles</Text>
                    </View>
                    <ScrollView>
                        <Text style={styles.text2}>{this.props.navigation.getParam('details', '...')}</Text>
                    </ScrollView>
                </View> 
                <View style={styles.botones}>
                    <TouchableHighlight onPress={() => this._openEdit()}>
                        <View style={styles.boton}>
                            <Icon name="edit" size={22} color="#0c6653" style={{position:'absolute',top:15,left:25}}/>
                            <Text style={styles.edit}>Editar</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.showAlert()}>
                        <View style={styles.boton2}>
                            <Icon name="trash-o" size={22} color="#FF0000" style={{position:'absolute',top:15,left:25}}/>
                            <Text style={styles.delate}>Eliminar</Text>
                        </View>
                    </TouchableHighlight>
                </View>  
            </View>
            <AwesomeAlert
                            show={showAlert}
                            showProgress={false}
                            title="Precaución"
                            message="¿Estás seguro de que desea eliminar este evento?
                            Una vez eliminado el evento, no podrá obtener información
                            sobre este."
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
                                this.props.navigation.navigate('Events')
                            }}
                            />
        </View>
    );
  }
      

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  icon: {
    paddingHorizontal:15,
},
   icon2: {
    position:'absolute',
    top:15,
    left:15,
   },

containerHeader:{
    backgroundColor:"#042e60",
    height:70,
    alignItems: 'center',
    paddingTop: 20,
    flexDirection: 'row',
},
textHeader:{
    color:'white',
    fontSize:18,
    alignContent:'center',
    alignItems:'center',
    paddingLeft:100,

},
detailContainer:{
    marginTop: 15,
    borderRadius:5,
    height:height*0.6,
    marginHorizontal: 15,
    alignContent: 'center',
    backgroundColor:'white',
},
textTitle:{
    color:'#0c6653',
    fontSize:34,
    alignContent:'center',
    alignItems:'center',
    marginHorizontal:15,
    marginVertical:20,
},
text:{
    color:'#878787',
    fontSize:24,
    paddingTop:10,
    marginHorizontal:15,
    left:27,
},
text2:{
    color:'#878787',
    fontSize:20,
    paddingTop:10,
    marginHorizontal:15,
},
edit:{
    color:'#0c6653',
    fontSize:22,
    paddingTop:10,
},
delate:{
    color:'#FF0000',
    fontSize:22,
    paddingTop:10,
},
boton:{
    width:(width-30)/2,
    marginVertical:2,
    borderRightWidth:1,
    borderRightColor:'gray',
    alignContent: 'center',
    alignItems:'center',
},
boton2:{
    width:(width-30)/2,
    marginHorizontal:2,
    marginVertical:2,
    borderLeftWidth:1,
    borderLeftColor:'gray',
    alignContent: 'center',    
    alignItems:'center',
},
botones:{
    backgroundColor:'white',
    flexDirection: 'row',
    borderRadius:5,
    height:height*0.08,
    alignContent: 'center',
    marginHorizontal: 15,
    marginVertical:15
},
text4:{
    color:'white',
    fontSize:18,
    alignContent:'center',
    alignItems:'center',
    paddingLeft:width/2 -100,

}
})