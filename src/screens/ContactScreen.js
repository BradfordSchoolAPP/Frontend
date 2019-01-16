import React from 'react';
import { StyleSheet, Text,TouchableHighlight, Linking,View, Button,Dimensions, ScrollView,Image} from 'react-native';



import Icon from 'react-native-vector-icons/FontAwesome'

import Header from '../components/Header'
const {width,height} = Dimensions.get('window');


export default class ContactScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerleft: null,
      drawerLabel: 'Contacto',
      drawerIcon:  
      <Icon
        name="phone"
        color= "white"
        size={20} 
      />
    };
  };

  constructor(props) {
    super(props);
    this.state = {
        informations:[],
        people: [],
        phones:[], 
    };
}

componentDidMount() {
    
  return fetch('http://68.183.139.254/api/v1/informations')
  .then( (response) => response.json() )
  .then( (responseJson ) => {
    this.setState({
      informations: responseJson,
    },()=>{
      this.setState({people: this.state.informations.people})
      this.setState({phones: this.state.informations.phone_numbers})
  })
})    
.catch((error) => {
console.log(error)
})
;
};
  _handleOpenWithLinking = () => {
    console.log("FUNCIONO EL BOTON KJIJIJIJIJ")
    Linking.openURL('mailto:support@example.com?subject=Mensaje a centro de padres') 
  }
  


  render(){
    let informations = this.state;
    return(

        <View style={styles.container}>
          <Header {...this.props} namePage="Contacto"/> 
          <View style={styles.containerImage}>
            <Image
            style={{width:width*0.50,height:width*0.50}}
            source={require('../images/logo-bradford.jpg')}
            />
          </View>
          <View style={{width:width*0.8, marginHorizontal: width*0.1, marginVertical:height*0.01}}>
            <Text style={{fontSize: 22, color:"gray"}}>{this.state.informations.description}</Text>
            <View style={[styles.center,{marginBottom:14}]}>
              <View style={[styles.center,{width:120,borderBottomColor:"#29a184",borderBottomWidth:2}]}>
                <Text style={{fontSize: 20, color:"#042e60", marginVertical:5}}>Personas </Text>
              </View>
              {this.state.people.map((item)=>{
                return(
                  <Text style={{fontSize: 18, color:"gray"}}>{item}</Text>
                )
              })}
            </View>
            <View style={{marginVertical:5}}>
                      <Text style={{fontSize:18,color:"gray",fontWeight: 'bold'}}>Dirección</Text>
                      <Text style={{fontSize:18,color:"gray"}}>{this.state.informations.address}</Text>
            </View>
            <View style={{marginVertical:5}}>
              <Text style={{fontSize:18,color:"gray",fontWeight: 'bold'}}>Telefonos</Text>
                {this.state.phones.map((item)=>{
                  return(
                          <Text style={styles.seemore} 
                            onPress={()=> Linking.openURL('tel:'+item)}>+{item}</Text>
                  )
                })}
            </View>
            <View style={{marginVertical:5}}>
              <Text style={{fontSize:18,color:"gray",fontWeight: 'bold'}}>Correo</Text>
              <Text style={styles.seemore} 
                onPress={() => Linking.openURL('mailto:'+this.state.informations.email+'?subject=Mensaje a centro de padres')}>
                {this.state.informations.email}
              </Text>
            </View> 
          </View>
        </View>
    );
  }
      

}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white',
  },
  containerImage:{
    height:height*0.35,
    width:width,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  bottom: {
    backgroundColor: "#29a184",
    width: 130,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: 'center',
    alignContent:"center",
    alignItems:"center",
    alignSelf:"center"
  },
  text: {
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center'
  },
  center:{
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center'
  },
  seemore:{
    color: "#29a184",
    textDecorationLine:"underline",
    fontSize:18,
  }
})