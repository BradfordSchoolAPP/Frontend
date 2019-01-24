import React from 'react';
import { StyleSheet, Text,TouchableHighlight, View,TextInput, Button,Dimensions,TouchableWithoutFeedback, ScrollView,Image} from 'react-native';
import AppNavigator from '../navigation/AppNavigator';
import AwesomeAlert from 'react-native-awesome-alerts';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome'
import Header from '../components/Header'

import Modal from "react-native-modal";

const {width,height} = Dimensions.get('window');

export default class EditBenefit extends React.Component {
    constructor(props){
        super(props)
    
        this.state= {
            id: this.props.navigation.getParam('id'),
            name: this.props.navigation.getParam('name'),
            details: this.props.navigation.getParam('details'),
            date: this.props.navigation.getParam('date'),
            deadline_date: this.props.navigation.getParam('deadline_date'),
            deadline_hour: this.props.navigation.getParam('deadline_hour'),
            requeriments:this.props.navigation.getParam('requeriments'),
            newRequeriments:[],
            newRqueriment:'',
            number:0,
            showAlert: false,
            modalVisible:false,
            fullDates: false,
            loading: true,
            confirm: false,
            message: '',
        }
      }
      componentDidMount() {
        this.state.requeriments.map((item) => {
            var aux = {}
            aux["id"] = this.state.requeriments.indexOf(item)
            aux["name"] = item
            this.setState({number:this.state.requeriments.length})
            this.state.newRequeriments.push(aux)
        })

      }
    
     _validate(){
        const aux=[]
        this.state.newRequeriments.map((item) => {
            aux.push(item.name)
        })
        this.setState({requeriments:aux}, function() {
        if(this.state.name === '' || this.state.details === '' || this.state.date === '' || this.state.deadline_date === '' || this.state.deadline_hour=== '' || this.state.requeriments.length=== 0 ){
            this.setState({loading:false,confirm:true,message:"Existen campos vacios. Por favor, ingrese todos los campos."})
            this.showAlert()
        }
        else{
            this.setState({fullDates:true})
            this.setState({loading:true, confirm:false, message:"Editando información"})
            this.showAlert()
            this.edit()
        }
    });
    }
    
      edit(){
        fetch('http://68.183.139.254/api/v1/scolarships', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.state.id,
          name: this.state.name,
          details: this.state.details,
          date: this.state.date,
          deadline_date: this.state.deadline_date,
          deadline_hour: this.state.deadline_hour,
          requeriments:this.state.requeriments,

        }),
      });
      setTimeout(()=>{this.setState({loading:false, confirm:true, message:"Cambios exitosos"});}, 2000);
    }
    delateRequeriment(requeriment){
        const auxNewRequeriments = this.state.newRequeriments.slice()
        index = auxNewRequeriments.findIndex(x => x.id==requeriment.id)
        auxNewRequeriments.splice(index,1)
        this.setState({ newRequeriments:auxNewRequeriments}, function() {
        });
        
        
    }
    addRequeriment(){
        const auxNewRequeriments = this.state.newRequeriments.slice()
        var requeriment= {}
        requeriment["id"] = this.state.number
        requeriment["name"]=this.state.newRqueriment
        auxNewRequeriments.push(requeriment)
        this.setState({newRequeriments:auxNewRequeriments}, function () {
            this.setState({newRqueriment:''})
            this.setState({number:this.state.number+1})
            this.setState({modalVisible:false})
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

    options(){
        if(this.state.fullDates){
            this.props.navigation.navigate('Benefits')
        }
        else{
            this.hideAlert()
        }
    }
      
  static navigationOptions = ({ navigation }) => {
    return {
      headerleft: null,
      drawerLabel: 'Editar informaciòn',
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
    let requeriments = this.state.newRequeriments;
    return(
        <View style={styles.container}>
            <View style={styles.containerHeader}> 
                    <TouchableWithoutFeedback
                        onPress={() => this.props.navigation.navigate('Benefits')}
                    >
                        <Icon
                            style ={styles.iconHeader}
                            name="angle-left"
                            color= "white"
                            size={20}
                        />
                    </TouchableWithoutFeedback>
                        
                    <Text style={styles.textHeader}>
                        Editar Información
                    </Text>                    
            </View>
            <View style={styles.formulario}>
                <View style={[styles.form, {marginTop:10}]}>
                    <TextInput
                        style={styles.input}
                        value = {this.state.name}
                        multiline={true}
                        underlineColorAndroid = {'transparent'}
                        keyboardType = 'default'
                        onChangeText={(value) => this.setState({name: value})}
                        onContentSizeChange={(event) => {
                            this.setState({ heightAux: event.nativeEvent.contentSize.heightAux })
                        }}
                        style={[styles.input, {height: Math.max(35, this.state.heightAux)},{color:'#0c6653',fontSize:24}]}
                    /> 
                </View>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        value = {this.state.details}
                        multiline={true}
                        underlineColorAndroid = {'transparent'}
                        keyboardType = 'default'
                        onChangeText={(value) => this.setState({details: value})}
                        onContentSizeChange={(event) => {
                        this.setState({ heightAux: event.nativeEvent.contentSize.heightAux })
                        }}
                        style={[styles.input, {height: Math.max(150, this.state.heightAux)}]}
                    />
                </View>
                <View style={{ paddingLeft:40,marginTop:10}}>
                    <Text style={{fontSize: 20,fontWeight:'bold' ,color:"gray"}}>Fecha de inicio</Text>
                    <View style={{flexDirection: 'row',alignContent:'space-between'}}>
                        <Icon name="calendar" size={26} color="grey" style={styles.icon}/>
                        <DatePicker
                            style={{width: 160}}
                            date={this.state.date}
                            mode="date"
                            placeholder="Fecha Fin"
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
                    </View>
                </View> 
                <View style={[styles.form,{padding:0}]}>
                    <Text style={{fontSize: 20,fontWeight:'bold' ,color:"gray"}}>Fecha de termino</Text>
                    <View style={{flexDirection: 'row',alignContent:'space-between'}}>
                        <Icon name="calendar" size={26} color="grey" style={styles.icon}/>
                        <DatePicker
                            style={{width: 160}}
                            date={this.state.deadline_date}
                            mode="date"
                            placeholder="Fecha Fin"
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
                            onDateChange={(date) => {this.setState({deadline_date: date})}}
                        />
                        <Icon name="clock-o" size={27} color="gray" style={styles.icon2}/>
                            <DatePicker
                                style={{
                                height: 45,
                                width: width*0.3,
                                marginLeft: 20,
                                }}
                                date={this.state.deadline_hour}
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
                                onDateChange={(time) => {this.setState({deadline_hour: time});}}
                            />
                    </View>
                </View>
                <View style={{ paddingLeft:40,marginTop:20}}>
                    <Text style={{fontSize: 20,fontWeight:'bold' ,color:"gray"}}>Requisitos</Text>
                </View>
                <ScrollView contentContainerStyle={styles.contentContainer} maximumZoomScale={0.5}>
                    {this.state.newRequeriments.map((item,i) => {
                    return (
                        <View style={{paddingLeft:40,marginTop:5}}>
                            <TouchableHighlight key={i} underlayColor="transparent" style={styles.buttonRequeriment} onPress={() => this.delateRequeriment(item)}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontSize:18,color:'gray'}}>{item.name}</Text>
                                    <Icon name="remove" size={16} color="gray" style={{left:4}}/>
                                </View>
                            </TouchableHighlight>
                        </View>                     
                    )})}
                    <View style={{paddingLeft:40,marginTop:10}}>
                <TouchableHighlight underlayColor="transparent" style={[styles.buttonRequeriment,{borderColor:'#0c6653'}]} onPress={() => this.setState({modalVisible:true})}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:20,color:'gray'}}>Agregar requisito</Text>
                            <Icon name="plus" size={16} color="#0c6653" style={{left:4,top:4}}/>
                        </View>
                </TouchableHighlight>
                </View>
                </ScrollView>
            </View>   
            <View style={[styles.containerButtons,{justifyContent:'center'}]}>
                        <TouchableHighlight style={styles.button} onPress={() => this._validate()}>
                                <Text style={[{color:"white",fontSize:18}]}>Editar</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={[styles.button,{backgroundColor:"white",borderWidth:1,borderColor:"gray"}]} onPress={() => this.props.navigation.navigate('Benefits')}>
                                <Text style={{color:"gray", fontSize:18}}>Cancelar</Text>
                        </TouchableHighlight>
                    </View>    
            <Modal isVisible={this.state.modalVisible} style={styles.modalContent}>
            <View style={{alignItems:'center'}}>
                    <View style={{paddingVertical:20}}>
                    <Text style={{fontSize:20,fontWeight:'bold',color:'#0c6653'}}>Agregar un nuevo requisito</Text>
                    </View>
                    <View style={{paddingVertical:10}}>
                    <TextInput
                        style={[styles.input,{backgroundColor:'red'}]}
                        value = {this.state.newRqueriment}
                        multiline={true}
                        underlineColorAndroid = {'transparent'}
                        keyboardType = 'default'
                        onChangeText={(value) => this.setState({newRqueriment: value})}
                        onContentSizeChange={(event) => {
                            this.setState({ heightAux: event.nativeEvent.contentSize.heightAux })
                        }}
                        style={[styles.input, {height: Math.max(35, this.state.heightAux)},{color:'gray',fontSize:18}]}
                    /> 
                    </View>
                    <View style={[styles.containerButtons,{ marginVertical:20}]}>
                        <TouchableHighlight style={styles.button} onPress={() => this.addRequeriment()}>
                                <Text style={[{color:"white",fontSize:18}]}>Agregar</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={[styles.button,{backgroundColor:"white",borderWidth:1,borderColor:"gray"}]} onPress={() => this.setState({modalVisible:false})}>
                                <Text style={{color:"gray", fontSize:18}}>Cancelar</Text>
                        </TouchableHighlight>
                    </View> 
                    </View> 
                </Modal>
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
    height:height*0.8,
    width:width,
    paddingBottom:10,
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
buttonRequeriment:{
    width: width*0.5,
    height: 40,
    padding:8,
    borderWidth:0.5,
    borderColor:'gray',
    borderRadius:2,
    marginBottom:4,
    marginRight:8,
    flexDirection: 'row',
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
  containerButtons:{
    flexDirection: 'row',
    alignContent:'center',
    alignItems:'center',
    marginHorizontal:width*0.03, 
},
modalContent: {
    backgroundColor: 'white',
    borderRadius:10,
    marginHorizontal: width*0.1,
    marginVertical: height*0.35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: "#29a184",
    marginHorizontal:5,
    width: 130,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 10,
    justifyContent: 'center',
    alignContent:"center",
    alignItems:"center",
    alignSelf:"center"
  },
  contentContainer:{
  }
})