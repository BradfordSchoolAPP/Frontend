import React from 'react';
import { StyleSheet, Text,TouchableHighlight, View, Button,Dimensions, ScrollView,Image, Picker} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'

import Header from '../components/Header'
const {width,height} = Dimensions.get('window');
import { Dropdown } from 'react-native-material-dropdown';


export default class MyCoursesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: 'Mis cursos',
      drawerIcon:  
      <Icon
        name="child"
        color= "white"
        size={20} 
      />
    };
  };
  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.studentRef = this.updateRef.bind(this, 'student');
    this.state = {
        student:'',
        modalVisible:false,
        course: {},
        childrens:[],
        namesChildrens: [],
        schoolmates:[],
        json:[], 
    };
}
onChangeText(text) {
  this.setState({ student: text });
  console.log("el nuevo valor es: "+ this.state.student)
  this.state.childrens.map((item) => {
    if(item.name === text){
      this.setState({ course: item.course });
      console.log("el item nname es " + item.course.year_course)
    }
   
  });
}
updateRef(name, ref) {
  this[name] = ref;
}

getSchoolmates(id){
  return fetch('http://68.183.139.254/api/v1/courses/'+id+'/students')
    .then( (response) => response.json() )
    .then( (responseJson ) => {
      this.setState({
        schoolmates: responseJson,
      })
    })

    .catch((error) => {
      console.log(error)
    });
  }


componentDidMount() {
    return fetch('http://68.183.139.254/api/v1/parents/6/students')
    .then( (response) => response.json() )
    .then( (responseJson ) => {
      this.setState({
        json: responseJson,
      },()=>{
            var i = 0;
            auxChildrens = [];
            auxNames = []
        this.state.json.map((item) => {
            if(i === 0 ){
              this.setState({student: item.name})
              this.setState({course: item.course})
              this.getSchoolmates(item.course.id)
            }
            var auxChildren = {}
            var auxName = {}
            auxName["value"] = item.name
            auxChildren["id"] = item.id
            auxChildren["name"] = item.name
            auxChildren["course"] = item.course
            i = i + 1
            auxChildrens.push(auxChildren)
            auxNames.push(auxName)
            this.setState({childrens: auxChildrens})
            this.setState({namesChildrens: auxNames})
        })
      })
      
    })    
    .catch((error) => {
      console.log(error)
    })
    ;
  };

  render(){
    let student = this.state;
    let course = this.state
    let schoolmates = this.state;
    console.log("primervalor" +this.state.student)
    console.log(this.state.childrens)
    console.log("···········")
    console.log(this.state.course)
    console.log("···········KYA")
    console.log(this.state.schoolmates)
    console.log("nandeto")
    return(
        <View style={styles.container}>
          <Header {...this.props} namePage="Mis cursos"/> 
          <View style= {styles.container2}>
            <View style={{flexDirection: 'row',alignContent:'space-between'}}>
              <Icon name="user" size={20} color="#042e60" style={styles.icon}/>
              <Text style={{fontSize: 18, color: "#042e60",marginLeft: 20,}}>Estudiante</Text>
              <View style= {{width:width*0.45}}>
                <Dropdown
                  containerStyle={{
                    marginTop: -36,
                    marginLeft: 15,
                  }}
                  fontSize = {18}
                  ref={this.studentRef}
                  value={this.state.student}
                  onChangeText={this.onChangeText}
                  data={this.state.namesChildrens}
                />
              </View>
            </View>
            <View style={{marginVertical: height*0.04,alignContent:"center",alignItems:"center",justifyContent:"center"}}>
                  <Text style={{fontSize:30, color: "#29a184"}}>{this.state.course.year_course + " - " + this.state.course.section }</Text>
            </View>
            <ScrollView>
                {this.state.schoolmates.map((item) => {
                  return (
                      <TouchableHighlight underlayColor="transparent" key={item.name}
                            style={styles.containerSchoolmates} 
                            onPress={() => console.log("pollito")}
                          >
                          <View style={{flexDirection: 'row',alignContent:'space-between'}}>
                          <View style={{backgroundColor:"red",width:60}}>

                          </View>
                          <Text style={{fontSize:24, color: "#042e60",marginHorizontal:20,marginVertical:17}}>{item.name}</Text> 

                          </View>
                      </TouchableHighlight>                   
                  )
              })}
            </ScrollView>
          </View>
        </View>
    );
  }
      

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  container2: {
    marginVertical: height*0.04,
    marginHorizontal: width*0.1
  },
  icon: {
    position:'absolute',
   },
   containerSchoolmates:{
    height:height*0.1,

    borderTopColor:'#ACABAB',
    borderTopWidth:1,
    borderBottomColor:'#ACABAB',
    borderBottomWidth:1
  },
})