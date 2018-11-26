import React from 'react';
import { StyleSheet, 
  Text,
  TextInput,
  TouchableHighlight, 
  View, 
  Button,
  Dimensions, 
  ScrollView,
  Alert,
  Modal,
  Image} from 'react-native';

  import AppNavigator from '../navigation/AppNavigator';

import Icon from 'react-native-vector-icons/FontAwesome'
import AwesomeAlert from 'react-native-awesome-alerts';
import DatePicker from 'react-native-datepicker';
import Event from '../components/Event'
import Header from '../components/Header'

const {width,height} = Dimensions.get('window');

var FloatingLabel = require('react-native-floating-labels');

export default class EventsScreen extends React.Component {
  constructor(props){
    super(props)

    this.state= {
      title:'',
      detail: '',
      place: '',
      date:'',
      hour:'',
      modalVisible: false,
      json:[
        {
          title:'Navidad',
          detail:'se celebra la navidad aki',
          place:'Casa Javier',
          date:'2018-12-25',
          hour:'00:00'
        },
        {
          title:'Fin semestre',
          detail:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur ornare congue. Vivamus faucibus, urna et mattis maximus, ante lacus luctus sapien, sit amet feugiat metus tellus ac ligula. Phasellus mattis rutrum mattis. Suspendisse potenti. Nam laoreet imperdiet purus, et pulvinar dolor tincidunt id',
          place:'Universidad de Santiago',
          date:'2018-11-02',
          hour:'15:30'
        }],
    }
  }
  openModal() {
    this.setState({modalVisible:true});
  }

  closeModal() {
    this.setState({modalVisible:false});
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerleft: null,
      drawerLabel: 'Eventos',
      drawerIcon:  
      <Icon
        name="calendar-times-o"
        color= "white"
        size={20} 
      />
    };
  }; 
  render(){
    return(
      <View>
          <Modal
              transparent
              visible={this.state.modalVisible}
              animationType={'slide'}
              onRequestClose={() => this.closeModal()}
          >
            <View style={styles.modalContainer}>
              <View style={styles.innerContainer}>
                <Text style={styles.textTitle}>Nuevo evento</Text>
                <FloatingLabel 
                  labelStyle={styles.labelInput}
                  inputStyle={styles.input}
                  style={styles.formInput}
                  onChangeText={(value) => this.setState({title: value})}
                  value = {this.state.title}
                  >Titulo</FloatingLabel>
                <FloatingLabel 
                  labelStyle={styles.labelInput}
                  inputStyle={styles.input}
                  style={styles.formInput}
                  onChangeText={(value) => this.setState({place: value})}
                  value = {this.state.place}
                  >Lugar</FloatingLabel>
                <Text style={styles.text2}>Detalle</Text>
                <TextInput
                  style={styles.textArea}
                  multiline={true}
                  placeholder='Agregue una descripción del evento'
                  placeholderTextColor='#878787'
                  onChangeText={(value) => this.setState({detail: value})}
                >          
                </TextInput>
                <View style={{ flexDirection: 'row'}}>
                <Text style={styles.text2}>Hora</Text>
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
                  confirmBtnText="Confirm"
                  minuteInterval={10}
                  onDateChange={(time) => {this.setState({hour: time});}}
                />
                </View>
                <Button
                    onPress={() => this.closeModal()}
                    title="Close modal"
                >
                </Button>
              </View>
            </View>
          </Modal>
          <Header {...this.props} namePage="Eventos"/>
          <ScrollView style={{height:height*0.82}}>
          {this.state.json.map((item) => {
            console.log(item.title)
            return (
                  <Event 
                  key={item.title}
                  navigation={this.props.navigation}
                  title={item.title}
                  hour={item.hour}
                  place={item.place}
                  date={item.date}
                  detail={item.detail} 
                  dataJson={item}/>                     
            )})
          }
          </ScrollView>
          <TouchableHighlight style={styles.boton} onPress={() => this.openModal()}>
            <Text style={styles.text}>Agregar evento</Text>            
          </TouchableHighlight>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  boton:{
      alignItems:'center',
      justifyContent:'center',
      width:width*0.8,
      height:height*0.05,
      backgroundColor:'#00AD9C',
      borderRadius:10,
      marginHorizontal:width*0.1,
      marginVertical:height*0.01,
  },
  modalContainer: {
    height:height*0.9,
    marginVertical:height*0.05,
    marginHorizontal:width*0.05,
    borderRadius:30,
    backgroundColor: 'white',
  },
  innerContainer: {
    alignItems: "stretch",
    marginTop:20,
  },
  icon:{
    position:'absolute',
    marginVertical:2,
    left:60
  },
  textTitle:{
    color:'#00AD9C',
    fontSize:30,
    alignContent:'center',
    alignItems:'center',
    marginHorizontal:15,
    marginTop:5,
    marginBottom:10,
  },
  text:{
    fontSize:20,
    color:'white',
  },
  text2:{
    color: '#878787',
    fontSize: 20,
    marginLeft:22,
    marginTop:10,
  },
  labelInput: {
    color: '#878787',
    fontSize: 20,
  },
  formInput: {    
    borderBottomWidth:0, 
    marginLeft: 22,
    borderColor: '#36485f', 
    marginTop:10,
        
  },
  input: {
    borderWidth: 0,
    color:'#878787',
    fontSize:20,
    width:width*0.8,
    height:45,
  },
  textArea:{
    marginLeft: 26,
    borderTopWidth: 1,
    borderColor:'#878787',
    color:'#878787',
    fontSize:20,
    height:100,
    width:width*0.8,
    marginLeft: 22,
    marginTop:5,
    justifyContent: "flex-start"
  }
})