import React from 'react';
import { StyleSheet, Text,TouchableHighlight,Modal, View,FlatList, Button,Dimensions, ScrollView,Image} from 'react-native';

import Header from '../components/Header'
import New from '../components/New'
import DetailsNew from './DetailsNew'
import * as firebase from 'firebase';

import Icon from 'react-native-vector-icons/FontAwesome'
import Carousel, { Pagination } from 'react-native-snap-carousel';






export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: 'Noticias',
      drawerIcon:  
      <Icon
        name="newspaper-o"
        color= "white"
        size={20} 
      />
    };
  };

  constructor(props) {
    super(props);
    console.ignoredYellowBox = [
      'Setting a timer'
      ];
    this.state = {
      url:null,
      detailsOpen:false,
      json:[
        {
          img_num:3,
          img_dir:'1540831229393',
          title:'ALUMNA DE 6º BÁSICO OBTIENE TRES MEDALLAS EN COMPETENCIA INTERNACIONAL DE GIMNASIA',
          date:'12 nov 2018',
          details:'Con gran orgullo destacamos a Catalina Sobarzo de 6ºC, por su excelente participación en la Copa de Gimnasia Ariana Orrego, que se realizó en el Coliseo Eduardo Dibos, Lima, Perú. Nuestra alumna demostró un impecable desempeño deportivo que le permitió ganar tres medallas compitiendo en el Nivel 3; Primer Lugar en salto y Tercer Lugar en barras asimétricas.  La competencia organizada por la compañía norteamericana Sport and Beyond, contó con la participación de 600 atletas y 29 delegaciones de Argentina, Aruba, Bolivia, Chile, Colombia, Estados Unidos, Paraguay, Perú y Ecuador. ¡Felicitamos a Catalina por este gran logro!'
        },
        {
          img_num:4,
          img_dir:'1540913252877',
          title:'ALUMNOS LÍDERES DE VOLANDO EN V PARTICIPAN DE IMPORTANTE ENCUENTRO INTERESCOLAR',
          date:' 8 nov 2018',
          details: 'detalles de la noticia'
        }],
        /*json:[],*/

      
    }
  }

  /*
  componentDidMount() {
    
    return fetch('http://191.115.226.55/api/v1/news')
    .then( (response) => response.json() )
    .then( (responseJson ) => {
      this.setState({
        json: responseJson,
      })
    })

    .catch((error) => {
      console.log(error)
    });
  }
  */

  backNew = (callback) => {
    callback.then((photos) => {
      this.setState({
        imageBrowserOpen: false,
      })
    }).catch((e) => console.log(e))
  }

  


 
  render(){ 
    
    return(
      <View style={styles.containerView}>

        <Header {...this.props} namePage="Noticias"/> 

        <ScrollView style={styles.container}>
            {this.state.json.map((item) => {
              console.log(item)
              return (
                    <New key={item.title} dataJson={item}
                        navigation={this.props.navigation}
                        />
                  
                  
              )
            })}
        </ScrollView>

      </View>
    );
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
  containerView: {
    flex:1,
    backgroundColor:"transparent"
  },
  bottom: {
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: 'center',
    alignContent:"center",
    alignItems:"center"
  },
})