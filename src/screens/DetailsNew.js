import React from 'react';
import { StyleSheet, Text,TouchableHighlight,ActivityIndicator, TouchableWithoutFeedback, View, Button,Dimensions, ScrollView,Image} from 'react-native';

import Header from '../components/Header'
const {width,height} = Dimensions.get('window')
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class DetailsNew extends React.Component {
 
constructor(props) {
    super(props);
    this.state = {
        img_dir:'',
        data:null,
        load:false,
        urlImages:[],
    }
}   

formatDate(date) {
    var monthNames = [
      "Enero", "Febrero", "Marzo",
      "Abril", "Mayo", "Junio", "Julio",
      "Agosto", "Septiembre", "Octubre",
      "Noviembre", "Diciembre"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' de ' + monthNames[monthIndex] + ' ' + year;
  }

  componentWillMount(){    
      try{
        const { navigation } = this.props;
        data = navigation.getParam('data', 'some default value');
        const imageRef = firebase.storage().ref('images/'+ data.img_dir + '/imagen0.jpg')
        imageRef.getDownloadURL()
        .then((url) => {
          this.setState({
            urlImages:this.state.urlImages.concat([url])
          })  
        
        })
        .then(()=> {
            this.setState({load:true})
        });
        
      }
      catch(error){
        console.log("aun no se obtiene la imagen")
      }
    }



  render(){
    const { navigation } = this.props;
    data = navigation.getParam('data', 'some default value');

    return(
        <View style={styles.container}>
            <View style={styles.containerHeader}> 
                    <TouchableWithoutFeedback
                        onPress={() => {
                        const { navigate } = this.props.navigation.navigate('Home');
                        }
                    }>
                        <Icon
                            style ={styles.icon}
                            name="angle-left"
                            color= "white"
                            size={20}
                        />
                    </TouchableWithoutFeedback>
                        
                    <Text style={styles.text}>
                        Detalle noticia
                    </Text>                   
                   
            </View>

            <ScrollView style={styles.container}>
            {this.state.load ? 
                <Image style={styles.image} source={{ uri: this.state.urlImages[0]  }} />
                :
                <ActivityIndicator size="large" color="#042e60" />
            }
                
                <View style={styles.containerTitle}>
                    <Text style={styles.title}> {data.title}</Text>
                </View>
                <View style={styles.dateView}>
                    <Icon
                        name="clock-o"
                        color= "grey"
                        size={20} 
                    />
                    <Text style={styles.dateText}> {this.formatDate(new Date(data.date))}</Text>
                </View>
                
                <View style={styles.detailsView}>
                    <Text style= {styles.detailsText}> {data.details}</Text>
                </View>
                
            </ScrollView>
            
        </View>
    );
  }
      

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image:{
    width:width,
    height:240,
  },
  title:{
    paddingTop:20,
    fontSize:20,
    fontWeight: "bold",
    textAlign:"left",
    color:"#004d40",
  },
  containerTitle:{
    backgroundColor:"transparent",
    width:width-20,
    alignSelf:"center",
  },
  dateText:{
    color:"#424242",
    fontSize:14,
    alignSelf:"center"
  },
  dateView:{
    padding:10,
    paddingLeft:20,
    flexDirection: 'row',
    justifyContent: "space-between",
    width:200
  },
  detailsView:{
      width:width-20,
      alignSelf:"center",

  },
  detailsText:{
      fontSize:16,
      textAlign: "justify",
      color: "#424242"

  },
  icon: {
    paddingHorizontal:15,

},
containerHeader:{
    backgroundColor:"#042e60",
    height:70,
    alignItems: 'center',
    paddingTop: 20,
    flexDirection: 'row',
},
text:{
    color:'white',
    fontSize:18,
    alignContent:'center',
    alignItems:'center',
    paddingLeft:width/2 -100,

}
})