import React from 'react';
import { StyleSheet, 
  Text,
  TouchableHighlight, 
  View, 
  Button,
  Dimensions, 
  ScrollView,
  Image} from 'react-native';

import Header from '../components/Header'
import { Calendar, CalendarList, Agenda,LocaleConfig } from 'react-native-calendars'
import Icon from 'react-native-vector-icons/FontAwesome'


const {width,height} = Dimensions.get('window')

LocaleConfig.locales['cl'] = {
  monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  monthNamesShort: ['En.','Febr.','Mzo.','Abr.','May.','Jun.','Jul.','Agt','Sept.','Oct.','Nov.','Dic.'],
  dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
  dayNamesShort: ['Dom.','Lun.','Mar.','Mié.','Juev.','Vier.','Sáb.']
};
LocaleConfig.defaultLocale = 'cl';

let eventsDay;
export default class CalendarScreen extends React.Component {
  constructor(props){
    super(props)

    this.state= {
      listEvent: false,
      event:"",
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
          detail:'se acabo todo señores',
          place:'Universidad de Santiago',
          date:'2018-11-27',
          hour:'15:30'
        }],
    }
  }

  _events(date){
    eventsDay = this.state.json.filter(item => item.date === date)
    if(eventsDay.length != 0){
      console.log('si hay algo')
      this.setState({listEvent:true})
    }
    else{
      this.state.listEvent=false
      console.log('no hay nada')
      this.setState({listEvent:false})
    }
  }
  _listEvents(){
   if(this.state.listEvent){
     console.log('hay algo que tenemos q poner')
     return(<Text>HAY EVENTOS</Text>);
   }
   else{
     console.log('me muero')
     return(<Text>NO HAY EVENTOS</Text>)
   }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: 'Calendario',
      drawerIcon:  
      <Icon
        name="calendar"
        color= "white"
        size={20} 
      />
    };
  };

  render(){
    if(this.state.listEvent){
      
    }
    return(
      <View style={{backgroundColor:'white'}}>
          <Header {...this.props} namePage="Calendario"/> 
          <Calendar
            //onDayPress={this.onDayPress}
            onDayPress={(day) => this._events(day.dateString)} 
            style={styles.calendar}
            hideExtraDays
            markedDates={
              this.state.json
                .map(item =>
                  ({ [item.date]: { selected:true, marked:true } })
                  )
                .reduce(
                  ((accumulator,item) => accumulator = { ...accumulator, ...item }),
                  )
              }
          />
         <ScrollView style={styles.listEvent}>{this._listEvents()}</ScrollView>
      </View>
    );
  }
}
console.log(height)
const styles = StyleSheet.create({
  calendar: {
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  },
  listEvent:{
    marginTop:20,
    backgroundColor: 'red',
    height: height*0.3
  },
})