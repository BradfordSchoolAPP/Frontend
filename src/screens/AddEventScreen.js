import React from 'react';
import { StyleSheet, Text,TouchableHighlight, View,TextInput, Button,Dimensions, ScrollView,Image} from 'react-native';
import AppNavigator from '../navigation/AppNavigator';
import AwesomeAlert from 'react-native-awesome-alerts';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome'
import Header from '../components/Header'

const {width,height} = Dimensions.get('window');

export default class AddEventScreen extends React.Component {
    constructor(props){
        super(props)
    
        this.state= {
          title:'',
          details: '',
          place: '',
          date:'',
          hour: '',
          showAlert: false,
        }
      }
      
      async _validate(){
        if(this.state.title === '' || this.state.place === '' || this.state.date === '' || this.state.hour){
            this.imprimir()
            this.showAlert()
        }
        else{
            await this.imprimir()
        }
    }
      send(){
        fetch('191.115.4.254/api/v1/events', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: this.state.title,
          details: this.state.details,
          place: this.state.place,
          date: this.state.date,
          hour: this.state.hour
        }),
      });
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

    imprimir(){
        console.log(this.state.title)
        console.log(this.state.details)
        console.log(this.state.place)
        console.log(this.state.date)
        console.log(this.state.hour)
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
            <Header {...this.props} namePage="Nuevo evento"/> 
            <View style={styles.formulario}>
                <View style={[styles.form, {marginTop:10}]}>
                    <TextInput
                        style={styles.input}
                        placeholder = {'Título evento'}
                        multiline={true}
                        placeholderTextColor = {'grey'}
                        underlineColorAndroid = {'transparent'}
                        keyboardType = 'default'
                        onChangeText={(value) => this.setState({title: value})}
                        onContentSizeChange={(event) => {
                            this.setState({ heightAux: event.nativeEvent.contentSize.heightAux })
                        }}
                        style={[styles.input, {height: Math.max(35, this.state.heightAux)},{color:'#006C61',fontSize:24}]}
                    /> 
                </View>
                <View style={styles.form}>
                    <View style={{flexDirection: 'row',alignContent:'space-between'}}>
                        <Icon name="calendar" size={26} color="gray" style={styles.icon}/>
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
                                // ... You can check the source to find the other keys.
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
                            placeholder = {'Lugar'}
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
                        placeholder = {'Descripción'}
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
                    <Text style={styles.text}>Crear evento</Text>
                </TouchableHighlight>
            </View>
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                //title="Precaución"
                message="¡Existen campos vacios!,
                Debe llenar todos los campos."
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                //showCancelButton={true}
                showConfirmButton={true}
                confirmText="Aceptar"
                confirmButtonColor="green"
                style
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
    flex:1,
    backgroundColor: 'white',
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
  text:{
    fontSize:20,
    color:'white',
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
    backgroundColor: "#009688",
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