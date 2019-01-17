import React from 'react';
import { StyleSheet, Text,TouchableHighlight, View,TextInput, Button,Dimensions,TouchableWithoutFeedback, ScrollView,Image} from 'react-native';
import AppNavigator from '../navigation/AppNavigator';
import AwesomeAlert from 'react-native-awesome-alerts';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome'
import Header from '../components/Header'

const {width,height} = Dimensions.get('window');

export default class EditEvent extends React.Component {
    constructor(props){
        super(props)
    
        this.state= {
            id: this.props.navigation.getParam('id'),
            title: this.props.navigation.getParam('title'),
            date: this.props.navigation.getParam('date'),
            hour: this.props.navigation.getParam('hour'),
            place: this.props.navigation.getParam('place'),
            details: this.props.navigation.getParam('details'),
            showAlert: false,
            fullDates: false,
            loading: true,
            confirm: false,
            message: '',
        }
      }
      imprimir(){
          console.log("el titulo nuevo " + this.state.title)
          console.log("el lugar nuevo " + this.state.place)
          console.log("el hora nuevo " + this.state.hour)
          console.log("el dia nuevo " + this.state.date)
          console.log("el detalles nuevo " + this.state.details)
      }
    
     _validate(){
        if(this.state.title === '' || this.state.place === '' || this.state.date === '' || this.state.hour=== ''){
            console.log("faltan campos aun")
            this.setState({loading:false,confirm:true,message:"Existen campos vacios. Por favor, ingrese todos los cmapos."})
            this.showAlert()
        }
        else{
            console.log("campos llenados")
            this.setState({fullDates:true})
            this.setState({loading:true, confirm:false, message:"Editando Evento"})
            this.showAlert()
            this.imprimir()
            this.edit()
            setTimeout(()=>{this.setState({loading:false, confirm:true, message:"Cambios exitosos"});}, 2000);
        }
    }
      edit(){
        console.log("VAMOS A EDITAR:")
        console.log(this.state.id)
        fetch('http://68.183.139.254/api/v1/events', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.state.id,
          title: this.state.title,
          details: this.state.details,
          place: this.state.place,
          date: this.state.date,
          hour: this.state.hour,

        }),
      });
    }
    _openDetail(){
        this.props.navigation.navigate('DetailEvent',{
            id: this.props.navigation.getParam('id'),
            title: this.props.navigation.getParam('title'),
            date: this.props.navigation.getParam('date'),
            hour: this.props.navigation.getParam('hour'),
            place: this.props.navigation.getParam('place'),
            details: this.props.navigation.getParam('details'),
        })
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

    options(){
        if(this.state.fullDates){
            this.props.navigation.navigate('Events')
        }
        else{
            this.hideAlert()
        }
    }
      
  static navigationOptions = ({ navigation }) => {
    return {
      headerleft: null,
      drawerLabel: 'Crear Evento',
      drawerIcon:  
      <Icon
        name="calendar-plus-o"
        color= "white"
        size={20} 
      />
    };
  };

  render(){
    const {showAlert} = this.state;
    return(
        <View style={styles.container}>
            <View style={styles.containerHeader}> 
                    <TouchableWithoutFeedback
                        onPress={() => this._openDetail()}
                    >
                        <Icon
                            style ={styles.iconHeader}
                            name="angle-left"
                            color= "white"
                            size={20}
                        />
                    </TouchableWithoutFeedback>
                        
                    <Text style={styles.textHeader}>
                        Editar Evento
                    </Text>                    
            </View>
            <View style={styles.formulario}>
                <View style={[styles.form, {marginTop:10}]}>
                    <TextInput
                        style={styles.input}
                        value = {this.state.title}
                        multiline={true}
                        underlineColorAndroid = {'transparent'}
                        keyboardType = 'default'
                        onChangeText={(value) => this.setState({title: value})}
                        onContentSizeChange={(event) => {
                            this.setState({ heightAux: event.nativeEvent.contentSize.heightAux })
                        }}
                        style={[styles.input, {height: Math.max(35, this.state.heightAux)},{color:'#0c6653',fontSize:24}]}
                    /> 
                </View>
                <View style={styles.form}>
                    <View style={{flexDirection: 'row',alignContent:'space-between'}}>
                        <Icon name="calendar" size={26} color="grey" style={styles.icon}/>
                        <DatePicker
                            style={{width: 160}}
                            date={this.state.date}
                            mode="date"
                            placeholder="seleccionar día"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirmar"
                            cancelBtnText="Cancelar"
                            showIcon={false}
                            customStyles={{
                                dateInput: {
                                    marginLeft: 36,
                                    borderBottomColor: 'gray',
                                    borderWidth:0,
                                    borderBottomWidth: 1,
                                    padding:0,
                                    
                                },
                                dateText: {
                                    color:'#878787',
                                    fontSize:18,
                                },
                                placeholderText: {
                                    color: 'gray',
                                    fontSize:16,
                                }
                            }}
                            onDateChange={(date) => {this.setState({date: date})}}
                        />
                        <Icon name="clock-o" size={27} color="gray" style={styles.icon2}/>
                            <DatePicker
                                style={{
                                height: 45,
                                width: width*0.3,
                                marginLeft: 20,
                                }}
                                date={this.state.hour}
                                mode="time"
                                showIcon={false}
                                format="HH:mm"
                                confirmBtnText="Confirmar"
                                cancelBtnText="Cancelar"
                                minuteInterval={10}
                                customStyles={{
                                    dateInput: {
                                        marginLeft: 36,
                                        borderBottomColor: 'gray',
                                        borderWidth:0,
                                        borderBottomWidth: 1,
                                        padding:0,
                                        
                                    },
                                    dateText: {
                                        color:'#878787',
                                        fontSize:18,
                                    },
                                }}      
                                onDateChange={(time) => {this.setState({hour: time});}}
                            />
                    </View>
                </View>
                <View style={styles.form}>
                    <View style={{flexDirection: 'row',alignContent:'space-between'}}>
                        <Icon name="map-marker" size={28} color="gray" style={styles.icon3}/>
                        <TextInput
                            style={styles.input}
                            value={this.state.place}
                            multiline={true}
                            placeholderTextColor = {'gray'}
                            underlineColorAndroid = {'transparent'}
                            keyboardType = 'default'
                            onChangeText={(value) => this.setState({place: value})}
                            onContentSizeChange={(event) => {
                            this.setState({ heightAux: event.nativeEvent.contentSize.heightAux })
                            }}
                            style={[styles.input, {height: Math.max(50, this.state.heightAux), width:width*0.68,left:12}]}
                        />
                    </View>
                </View>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        value = {this.state.details}
                        multiline={true}
                        placeholderTextColor = {'gray'}
                        underlineColorAndroid = {'transparent'}
                        keyboardType = 'default'
                        onChangeText={(value) => this.setState({details: value})}
                        onContentSizeChange={(event) => {
                        this.setState({ heightAux: event.nativeEvent.contentSize.heightAux })
                        }}
                        style={[styles.input, {height: Math.max(150, this.state.heightAux)}]}
                    />
                </View> 
            </View>      
            <View style={styles.boton}>
                <TouchableHighlight style={styles.bottom} onPress={() => this._validate()}>
                    <Text style={styles.text}>Editar evento</Text>
                </TouchableHighlight>
            </View>
            <AwesomeAlert
                show={this.state.showAlert}
                showProgress={this.state.loading}
                message={this.state.message}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={this.state.confirm}
                confirmText="Aceptar"
                confirmButtonColor="green"
                style
                onConfirmPressed={() => 
                    {this.options()}
                }
            />          
        </View>
    );
  }
      

}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white',
  },
  containerHeader:{
    backgroundColor:"#042e60",
    height:70,
    alignItems: 'center',
    paddingTop: 20,
    flexDirection: 'row',
},
  formulario:{
    height:height*0.75,
    width:width,
  },
  form: {
    alignItems: "stretch",
    padding:15,
    marginBottom:-10,
    marginTop:10,
    alignContent:"center",
    alignSelf:"center",
},
boton:{
    alignItems:'center',
    alignContent:'center',
},
input:{
    width:width*0.75,
    height:40,
    fontSize:20,
    marginBottom: 10,
    paddingLeft: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    color:'#878787',
    maxHeight: 80
},
iconHeader: {
    paddingHorizontal:15,
},
  text:{
    fontSize:20,
    color:'white',
  },
  textHeader:{
    color:'white',
    fontSize:18,
    alignContent:'center',
    alignItems:'center',
    paddingLeft:width/2 -100,

},
  icon: {
    position:'absolute',
    top:10,
    left:8,
   },
   icon2: {
    position:'absolute',
    top:10,
    left:187,
   },
   icon3: {
    position:'absolute',
    top:5,
    left:-10,
   },
   bottom: {
    backgroundColor: "#29a184",
    width: width*0.75,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: 'center',
    alignContent:"center",
    alignItems:"center"
  },
})