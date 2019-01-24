import React from 'react';
import { Alert, Text, TextInput, StyleSheet, View, Dimensions,Keyboard, TouchableHighlight, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome'
import AwesomeAlert from 'react-native-awesome-alerts';
import Modal from "react-native-modal";
import Header from '../components/Header'





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
            items: [
                {
                    label: 'Todos',
                    value:'all',
                    id:1,
                },
                {
                    label: 'Niveles',
                    value:'levels',
                    id:2,
                },
            ],
            nameLevels: [],
            levels: [],
            json:[
                {
                    value:2,
                    celu: "k6diucPsZYw-EELCmW7HRM"
                },
                {
                    value:6,
                    celu:"TDW8TgKcumzor6eHyYjQ3E"
                },
                {
                    value:12,
                    celu:"YAJtPGAKJ2KO4iupZK2A1r"
                },
            ], 
        };
    }
    componentDidMount() {
        return fetch('http://68.183.139.254/api/v1/courses/years')
        .then( (response) => response.json() )
        .then( (responseJson ) => {
          this.setState({
            nameLevels: responseJson,
          },()=>{
                var i = 0;
            this.state.nameLevels.map((item) => {
                var auxLevel = {}
                auxLevel["name"] = item
                auxLevel["selected"] = "white"
                auxLevel["value"] = i
                i = i + 1
                this.state.levels.push(auxLevel)
            })
          })
          
        })    
        .catch((error) => {
          console.log(error)
        })
        ;
        
    
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
            this.hideAlert()
        }
        else{
            this.hideAlert()
        }
    }

    validate(selectedLevels){
        if(this.state.title === '' || this.state.details === '' || this.state.receptors === null || this.state.receptors === '' || this.state.receptors === undefined || (this.state.receptors === "levels" && selectedLevels.length === 0)){
            this.setState({loading:false,confirm:true,message:"Existen campos vacios. Por favor, ingrese todos los cmapos."})
            this.showAlert()
        }
        else{
            this.setState({fullDates:true})
            console.log("los datos son: "+ this.state.title + this.state.details + this.state.receptors)
            this.setState({loading:true, confirm:false, message:"Enviando alerta"})
            this.showAlert()
            this.send(selectedLevels)
            setTimeout(()=>{this.setState({loading:false, confirm:true, message:"Alerta enviada exitosamente"});}, 2000);
        }
    }
    //token natalia: TDW8TgKcumzor6eHyYjQ3E
    //token julio: k6diucPsZYw-EELCmW7HRM
    send(selectedItems){
        array_courses = []

        selectedItems.map((item) => {
            array_courses.push(item.name)
        })

        console.log("cursos *********************")
        console.log(array_courses)
    
        fetch('http://68.183.139.254/api/v1/courses/alert', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            courses: array_courses,
            title: this.state.title,
            details: this.state.details
            }),
        });
    }

    
    /*

      componentWillMount(){
        //registerForPushNotificationsAsync();
        this.listener = Notifications.addListener(this.listen)
      }
    
      componentWillUnmount(){
          this.listener && Notifications.removeListener(this.listen)
      }
    
      listen = ({origin,data}) => {
          console.log("cool data", origin, data)
          console.log("origin: ", origin)
          //console.log("type: ", data.json.type)
          if(origin == "selected"){
              //this.setState({loading:false, confirm:true, message:data.message})
              //this.showAlert()
                if(data.json.type === "noticia"){
                    {this.props.navigation.navigate('details',{
                        data: data.json,
                    })
                    }
                }
                else if(data.json.type === "alerta"){
                    {this.props.navigation.navigate('noti')}
                }
              
          }
      }*/
    
    componentWillMount(){
        date= Date.now()
        this.setState({img_dir:date})
    }

    deleteSelectLevels(selectedLevels){
        selectedLevels.map((item) => {
            this.selectedLevel(item)
        })
    }

    cancelar(selectedLevels){
        this.setState({modalVisible: false})
        this.deleteSelectLevels(selectedLevels)
    }

    selectedLevel(item){
        if(item.selected === "#DCDBDB"){
            const newCourses = this.state.levels.slice()
                newCourses[item.value].selected = "white"; 
                this.setState({levels:newCourses})
        }
        else{
                const newCourses = this.state.levels.slice()
                newCourses[item.value].selected = "#DCDBDB"; 
                this.setState({levels:newCourses})
        }
    }

    blockLevels(selectedLevels){
        if(this.state.receptors === 'levels'){
            return(
            <View>
                <View style={{width:width}}>
                    <View style={styles.containerLevels}>
                            {selectedLevels.map((item, i)=>{return(
                                <TouchableHighlight key={i} underlayColor="transparent" style={styles.buttonSelectedLevel} onPress={() => this.selectedLevel(item)}>
                                    <View style={{alignItems:'center',alignContent:'center',flexDirection: 'row'}}>
                                        <Text style={[styles.text,{fontSize:14}]}>{item.name}</Text>
                                        <Icon name="remove" size={16} color="gray" style={{left:4}}/>
                                    </View>
                                </TouchableHighlight>
                            )})}
                            <TouchableHighlight underlayColor="transparent" style={styles.buttonSelectedLevel} onPress={() => this.setState({modalVisible: true})}>
                                <View style={{alignItems:'center',alignContent:'center',flexDirection: 'row'}}>
                                    <Text style={[styles.text,{fontSize:14}]}>Agregar nivel</Text>
                                    <Icon name="plus" size={16} color="#0c6653" style={{left:4}}/>
                                </View>
                            </TouchableHighlight>
                    </View>
                </View>
                <Modal isVisible={this.state.modalVisible}
                    style={styles.modalContent}>
                    <ScrollView style={{height:height*0.65,marginTop:20}}>
                        {this.state.levels.map((item) => {
                            return (
                                <TouchableHighlight underlayColor="transparent" key={item.name}
                                     style={[styles.containerLevel,{backgroundColor:item.selected}]} 
                                     onPress={() => this.selectedLevel(item)}
                                    >
                                    <Text style={styles.textLevel}>{item.name}</Text> 
                                </TouchableHighlight>                   
                            )
                        })}
                    </ScrollView>
                    <View style={styles.containerButtons}>
                        <TouchableHighlight style={styles.button} onPress={() => this.setState({modalVisible:false})}>
                                <Text style={[{color:"white",fontSize:18}]}>Aceptar</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={[styles.button,{backgroundColor:"white",borderWidth:1,borderColor:"gray"}]} onPress={() => this.cancelar(selectedLevels)}>
                                <Text style={{color:"gray", fontSize:18}}>Cancelar</Text>
                        </TouchableHighlight>
                    </View>  
                </Modal>
            </View>   
            )
        }
        else{
            this.deleteSelectLevels(selectedLevels)
        }
    }

    render() {
        const {showAlert} = this.state;
        const { selectedItems } = this.state;
        let selectedLevels = this.state.levels.filter(item => item.selected ==="#DCDBDB");

        return (
            <View style={styles.container}>
                <Header {...this.props} namePage="Enviar alerta"/> 
                <View style={{height:height*0.75,width:width,}}>
                    <View style={[styles.form, {marginTop:10}]}>
                        <TextInput
                            onSubmitEditing={Keyboard.dismiss}
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
                            onSubmitEditing={Keyboard.dismiss}
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

                            useNativeAndroidPickerStyle={false}
                            />
                        </View>
                    </View>
                    <View style={{marginTop:20,height: height*0.3}}>{this.blockLevels(selectedLevels)}</View>
                </View>
                <View style={styles.button}>
                    <TouchableHighlight style={styles.button} onPress={() => this.validate(selectedLevels)}>
                        <Text style={{fontSize:20,color:"white"}}>Enviar</Text>
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
                        {this.props.navigation.navigate('Home')}
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
        padding:15,
        marginBottom:-10,
        marginTop:10,
        marginHorizontal:width*0.1,
        borderWidth: 1,
        borderRadius:4,
        borderColor:"#29a184",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
      },
      containerLevel:{
        height:height*0.08,
        borderTopColor:'#ACABAB',
        borderTopWidth:1
      },
      containerButtons:{
        flexDirection: 'row',
        alignContent:'center',
        alignItems:'center',
        marginHorizontal:width*0.03, 
        marginVertical:20,
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
    buttonSelectedLevel:{
        width: width*0.32,
        height: 30,
        justifyContent:"center",
        borderWidth:0.5,
        borderColor:'gray',
        borderRadius:10,
        marginBottom:4,
        marginRight:8,
        flexDirection: 'row',
    },
      form: {
        alignItems: "stretch",
        padding:15,
        marginBottom:-10,
        marginTop:10,
        alignContent:"center",
        alignSelf:"center",
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
      textLevel: {
        color:"gray",
        fontSize:18,
        marginHorizontal:20,
        marginVertical:17
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
      modalContent: {
        backgroundColor: 'white',
        borderRadius:10,
        marginHorizontal: width*0.1,
        marginVertical: height*0.1,
        alignItems: undefined,
        justifyContent: undefined,
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
    inputAndroid: {

        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 50,
        backgroundColor: 'white',
        color: 'black',
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