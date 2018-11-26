import React from 'react';
import { StyleSheet, Text,TouchableHighlight, View, Button,Dimensions, ScrollView,Image} from 'react-native';

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
  render(){
    Moment.locale('es')
    const {showAlert} = this.state;
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon
                    style ={styles.icon}
                    name="chevron-left"
                    color= "white"
                    size={20}
                />
                <Text style={styles.textHeader}>Información</Text>
            </View>
            <View style={{ alignContent: 'center',alignItems:'center'}}>
                <Text style={styles.textTitle}>{this.props.navigation.getParam('title', 'No existe evento')}</Text>
            </View>
            <View style={{backgroundColor:'#00AD9C',flex:1}}>
                <View style={styles.detailContainer}>
                    <View style={{ borderBottomColor: '#bbb',borderBottomWidth: StyleSheet.hairlineWidth,}}>
                        <Icon name="calendar" size={22} color="gray" style={styles.icon2}/>
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
                        <Text style={styles.text2}>{this.props.navigation.getParam('detail', '...')}</Text>
                    </ScrollView>
                </View> 
                <View style={styles.botones}>
                    <TouchableHighlight>
                        <View style={styles.boton}>
                            <Icon name="edit" size={24} color="#009688" style={{position:'absolute',top:15,left:25}}/>
                            <Text style={styles.edit}>Editar</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.showAlert()}>
                        <View style={styles.boton2}>
                            <Icon name="trash-o" size={24} color="#FF0000" style={{position:'absolute',top:15,left:25}}/>
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
    paddingVertical:100,
   },
   icon2: {
    position:'absolute',
    top:15,
    left:15,
   },
header:{
    backgroundColor:"#009688",
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
    borderRadius:15,
    height:height*0.6,
    marginHorizontal: 15,
    alignContent: 'center',
    backgroundColor:'white',
},
textTitle:{
    color:'#00AD9C',
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
    fontSize:24,
    paddingTop:10,
    marginHorizontal:15,
},
edit:{
    color:'#009688',
    fontSize:24,
    paddingTop:10,
},
delate:{
    color:'#FF0000',
    fontSize:24,
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
    borderRadius:15,
    height:height*0.08,
    alignContent: 'center',
    marginHorizontal: 15,
    marginVertical:15
}
})