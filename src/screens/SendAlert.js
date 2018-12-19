import React from 'react';
import { Alert, Text, TextInput, StyleSheet, View, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome'
import MultiSelect from 'react-native-multiple-select';
import AwesomeAlert from 'react-native-awesome-alerts';


import Modal from "react-native-modal";

import Header from '../components/Header'
import { Button } from 'react-native-elements';
const {width,height} = Dimensions.get('window');


export default class SendAlert extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          drawerLabel: 'Enviar alerta',
          drawerIcon:  
          <Icon
            name="bell"
            color= "white"
            size={20} 
          />
        };
      };

    
    constructor(props) {
        super(props);

        this.inputRefs = {};

        this.state = {
            showAlert: false,
            loading: true,
            confirm: false,
            message: '',
            fullDates:false,
            modalVisible:false,
            selectedItems: [],
            title:'',
            details:'',
            receptors: '',
            nivels: '',
            items: [
                {
                    label: 'Todos',
                    value:'all',
                    id:1,
                },
                {
                    label: 'Niveles',
                    value:'nivels',
                    id:2,
                },
            ],
            items2: [{
                value: 0,
                selected: false,
                name: 'Kinder',
                }, {
                value: 1,
                selected: false,
                name: '1ero Básico',
                }, {
                value: 2,
                selected: false,
                name: '2do Básico',
                }, {
                value: 3,
                selected: false,
                name: '3ero Básico',
                }, {
                value: 4,
                selected: false,
                name: '4to Básico',
                }, {
                value: 5,
                selected: false,
                name: '5to Básico',
              }, {
                value: 6,
                selected: false,
                name: '6to Básico',
              }, {
                value: 7,
                selected: false,
                name: '7mo Básico',
              }, {
                value: 8,
                selected: false,
                name: '8vo Básico',
              }, {
                value: 9,
                selected: false,
                name: '1ero Medio',
              }, {
                value: 10,
                selected: false,
                name: '2do Medio',
              }, {
                value: 11,
                selected: false,
                name: '3ero Medio',
              }, {
                value: 12,
                selected: false,
                name: '4to Medio',
              },
            ] 
        };
        this.selectConfirm = this.selectConfirm.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
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
            console.log("EXITOSO JAJA")
            console.log(this.state.receptors)
            console.log(this.state.title)
            console.log(this.state.details)
            this.hideAlert()
        }
        else{
            this.hideAlert()
        }
    }

    onChangeOptions(value){
        this.setState({receptors:value})
    }

    _validate(){
        console.log("**********" + this.state.receptors)
        if(this.state.title === '' || this.state.details === '' || this.state.receptors === null || this.state.receptors === '' || this.state.receptors === undefined){
            console.log("faltan campos aun")
            this.setState({loading:false,confirm:true,message:"Existen campos vacios. Por favor, ingrese todos los cmapos."})
            this.showAlert()
        }
        else{
            console.log("campos llenados")
            this.setState({fullDates:true})
            this.setState({loading:true, confirm:false, message:"Enviando alerta"})
            this.showAlert()
            //this.send()
            setTimeout(()=>{this.setState({loading:false, confirm:true, message:"Alerta enviada exitosamente"});}, 2000);
        }
    }
    onSelectedItemsChange = (selectedItems) => {
        this.setState({ selectedItems });
    }
    selectConfirm(list) {
        let {selectNivel} = this.state.selectNivel;
        for (let item of list) {
          let index = selectNivel.findIndex(ele => ele === item);
          if (~index) selectNivel[index].isSelected = true;
          else continue;
        }
        this.setState({selectNivel: selectNivel});
      }
      deleteItem(item) {
        let {selectNivel} = this.state.selectNivel;
        let index = selectNivel.findIndex(a => a === item);
        selectNivel[index].isSelected = false;
        this.setState({selectNivel: selectNivel});
      }
      _blockLevels(){
          if(this.state.receptors === 'nivels'){
              return(
                <View style={{width:width}}>
                <View style={styles.nivels}>
                    <ScrollView>
                        <TouchableHighlight style={[styles.addButton,{flexDirection: 'row'}]} onPress={() => this.setState({modalVisible: true})}>
                            <View style={[styles.boton,{flexDirection: 'row'}]}>
                                <Text style={[styles.text,{fontSize:14}]}>Agregar nivel</Text>
                                <Icon name="plus" size={16} color="#0c6653" style={{left:4}}/>
                            </View>
                        </TouchableHighlight>
                    </ScrollView>
                </View>
                </View>
              )
          }
      }
      _selectedLevel(item){
          console.log("====================")
          console.log(item.name)
          if(item.selected === true){
              this.setState({item.selected:false})
          }
          else{
                this.setState({item.selected:true})
          }
          console.log(item.selected)
          console.log("=====================")
      }
    render() {
        const {showAlert} = this.state;
        const { selectedItems } = this.state;
        return (
            <View style={styles.container}>
                <Header {...this.props} namePage="Enviar alerta"/> 
                <View style={styles.formulario}>
                    <View style={[styles.form, {marginTop:10}]}>
                        <TextInput
                            style={styles.input}
                            placeholder = {'Título alerta'}
                            multiline={true}
                            placeholderTextColor = {'grey'}
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
                            style={[styles.input, {height: Math.max(300, this.state.heightAux)}]}
                        />
                    </View>
                    <View style={styles.form}>
                        <View style={{flexDirection: 'row',alignContent:'space-between'}}>
                            <Text style={styles.text}>Enviar a: </Text>
                            <RNPickerSelect
                            doneText='Confirmar'
                            placeholder={{
                                label:'Elija una opción',
                                value:null,
                                color:"gray"
                            }}
                            items={this.state.items}
                            onValueChange={(value,id) => {
                                this.setState({
                                    receptors: value,
                                });
                                console.log(this.state.receptors)
                            }}
                            
                            onUpArrow={() => {
                                this.inputRefs.name.focus();
                            }}
                            onDownArrow={() => {
                                this.inputRefs.picker2.togglePicker();
                            }}
                            style={{ ...pickerSelectStyles}}
                            value={this.state.receptors}
                            ref={(el) => {
                                this.inputRefs.picker = el;
                            }}
                            />
                        </View>
                    </View>
                    <View style={styles.containerLevels}>{this._blockLevels()}</View>
                    <Modal isVisible={this.state.modalVisible}
                        style={styles.modalContent}>
                        <ScrollView style={{height:height*0.65,marginTop:20,backgroundColor:"white"}}>
                            {this.state.items2.map((item) => {
                            console.log("jaj")
                            console.log(item.selected)
                            console.log(item.name)
                            return (
                                <TouchableHighlight key={item.name} style={{height:height*0.08,borderTopColor:'#ACABAB',borderTopWidth:1}} onPress={() => this._selectedLevel(item)}>
                                    <Text style={{color:"gray", fontSize:18,marginHorizontal:20,marginVertical:17}}>{item.name}</Text> 
                                </TouchableHighlight>                   
                            )})
                        }
                        </ScrollView>
                        <View style={styles.bottoms}>
                            <TouchableHighlight style={[styles.bottom,{width:110,height:40}]} onPress={() => console.log("aceptado")}>
                                    <Text style={[styles.textButton,{fontSize:18}]}>Aceptar</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={[styles.bottom,{width:110,height:40,backgroundColor:"white",borderWidth:1,borderColor:"gray"}]} onPress={() => this.setState({modalVisible: false})}>
                                    <Text style={{color:"gray", fontSize:18}}>Cancelar</Text>
                            </TouchableHighlight>
                        </View>  
                    </Modal>
                </View>
                <View style={styles.boton}>
                    <TouchableHighlight style={styles.bottom} onPress={() => this._validate()}>
                        <Text style={styles.textButton}>Enviar</Text>
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
        flex: 1,
        backgroundColor: 'white',
      },
      containerLevels:{
        marginTop:20,
        height: height*0.3
      },
      nivels:{
        padding:15,
        marginBottom:-10,
        marginTop:10,
        marginHorizontal:width*0.1,
        borderColor:"#29a184",
        borderWidth: 1,
        borderRadius:4,
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
    bottoms:{
        flexDirection: 'row',
        alignContent:'center',
        alignItems:'center',
        marginHorizontal:width*0.1, 
        marginVertical:20,
    },
    boton:{
        alignItems:'center',
        alignContent:'center',
    },
    addButton:{
        width: width*0.32,
        height: 30,
        justifyContent:"center",
        borderWidth:0.5,
        borderColor:'gray',
        borderRadius:10,

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
        maxHeight: 160,
    },
      text:{
        fontSize:20,
        color:'#878787',
      },
      labelSelect: {
        marginTop: 5,
        marginBottom: 20,
        padding: 5,
        borderWidth: 1,
        borderRadius: 6,
        borderStyle: 'dashed',
        borderColor: '#6dc2a2'
      },
      bottom: {
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
      modalContent: {
        backgroundColor: 'white',
        borderRadius:10,
        marginHorizontal: width*0.1,
        marginVertical: height*0.1,
        alignItems: undefined,
        justifyContent: undefined,
      },
      textButton:{
        fontSize:20,
        color:'white',
      },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height:26,
        width:width*0.42,
        fontSize: 20,
        paddingTop: 3,
        paddingHorizontal: 10,
        paddingBottom: 3,
        backgroundColor: 'white',
        color: '#878787',
        marginLeft: 36,
        borderBottomColor: 'gray',
        borderWidth:0,
        borderBottomWidth: 1,
        padding:0,
    },
    icon: {
        position: 'absolute',
        backgroundColor: 'transparent',
        borderTopWidth: 8,
        borderTopColor: 'gray',
        borderRightWidth: 8,
        borderRightColor: 'transparent',
        borderLeftWidth: 8,
        borderLeftColor: 'transparent',
        width: 0,
        height: 0,
        top: 10,
        right: 10,
    },
});