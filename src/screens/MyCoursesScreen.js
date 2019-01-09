import React from 'react';
import { StyleSheet, Text,TouchableHighlight, View, Button,Dimensions, ScrollView,Image, ImageBackground, Picker} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'
import Modal from "react-native-modal";

import Header from '../components/Header'
import { Dropdown } from 'react-native-material-dropdown';
import UserAvatar from 'react-native-user-avatar';

const {width,height} = Dimensions.get('window');



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
        course: {"section": "","year_course":""},
        childrens:[],
        namesChildrens: [],
        schoolmates:[],
        schoolmate:"",
        parents:[],
        json:[], 
    };
}
onChangeText(text) {
  this.setState({ student: text });
  this.state.childrens.map((item) => {
    if(item.name === text){
      this.setState({ course: item.course });
      this.getSchoolmates(item.course.id);
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
getParents(id,name){
  return fetch('http://68.183.139.254/api/v1/students/'+id+'/parents')
    .then( (response) => response.json() )
    .then( (responseJson ) => {
      this.setState({
        parents: responseJson,
        schoolmate: name,
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
    let parents = this.state;
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
                            onPress={() => {this.getParents(item.id,item.name); this.setState({modalVisible: true})}}
                          >
                          <View style={{flexDirection: 'row',alignContent:'space-between'}}>
                          <View style={{width:60, alignContent:"center",alignItems:"center",justifyContent:"center"}}>
                            <UserAvatar size="55" name={item.name} />
                          </View>
                          <Text style={{fontSize:24, color: "#042e60",marginHorizontal:20,marginVertical:17}}>{item.name}</Text> 
                          </View>
                      </TouchableHighlight>                   
                  )
              })}
            </ScrollView>
            <Modal isVisible={this.state.modalVisible}
              style={styles.modalContainer}>
              <View style={styles.containerImage}>
                <Image
                style={{tintColor:"white",backgroundColor:'#29a184',width:width*0.75,height:height*0.28}}
                source={require('../images/Parents-icon.png')}
                />
              </View>
              <View style={{paddingHorizontal:width*0.05, paddingVertical:width*0.05}}>
                <Text style={{fontSize:18, color:"#042e60",marginBottom:10}}>Apoderado(s) de {this.state.schoolmate}</Text>
                <ScrollView style={{height:height*0.15}}>
                {this.state.parents.map((item)=> {
                  return(
                    <View>
                    <View style={{marginVertical:5, borderBottomColor: '#bbb',borderBottomWidth: StyleSheet.hairlineWidth,}}>
                      <Icon name="user" size={22} color="gray" style={{position:"absolute", marginBottom:12}}/>
                      <Text style={{fontSize:18,color:"gray", marginLeft: 30}}>{item.name}</Text>
                    </View> 
                    <View style={{marginVertical:5, borderBottomColor: '#bbb',borderBottomWidth: StyleSheet.hairlineWidth,}}>
                    <Icon name="envelope-o" size={20} color="gray" style={{position:"absolute", marginBottom:12}}/>
                    <Text style={{fontSize:18,color:"gray", marginLeft: 30}}>{item.email}</Text>
                    </View> 
                    <View style={{marginVertical:5, borderBottomColor: '#bbb',borderBottomWidth: StyleSheet.hairlineWidth,}}>
                      <Icon name="phone" size={22} color="gray" style={{position:"absolute", marginBottom:12}}/>
                      <Text style={{fontSize:18,color:"gray", marginLeft: 30}}>{item.phone_number}</Text>
                    </View>
                    </View>
                  )
                })}
                </ScrollView>
                <View style={styles.button}>
                    <TouchableHighlight style={styles.button} onPress={() => this.setState({modalVisible:false})}>
                        <Text style={{fontSize:20,color:"white"}}>Hecho</Text>
                    </TouchableHighlight>
                </View>
              </View>  
                    
            </Modal>
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
  modalContainer: {
    backgroundColor:"white",
    borderRadius:10,
    marginTop: height* 0.2,
    marginBottom: height*0.13,
    marginHorizontal: width* 0.1,
    width: width* 0.8,
    alignItems: undefined,
        justifyContent: undefined,
  },
  containerImage:{
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor:'#29a184',
    height:height*0.3,
    paddingVertical: height* 0.02,
    width:width*0.8,alignItems: "center"
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
  button: {
    backgroundColor: "#29a184",
    marginHorizontal:5,
    marginVertical:20,
    width: width*0.6,
    height: 40,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 10,
    justifyContent: 'center',
    alignContent:"center",
    alignItems:"center",
    alignSelf:"center"
  },
})