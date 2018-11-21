import React from 'react';
import { StyleSheet, Text,TouchableHighlight, View,FlatList, Button,Dimensions, ScrollView,Image} from 'react-native';

import Header from '../components/Header'
import * as firebase from 'firebase';

import Icon from 'react-native-vector-icons/FontAwesome'
import Carousel, { Pagination } from 'react-native-snap-carousel';



const {width,height} = Dimensions.get('window')


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
      activeSlide:0,
      videos: [
        {
          thumbnail: "https://www.bradfordschool.cl/3w/cache/shortcodes/1-720x480-2bf1c0e33ca16117d9f41b717a0c963d.JPG"
        }, {
          thumbnail: "https://www.bradfordschool.cl/3w/cache/shortcodes/2-720x480-a04965e7c7a733d28011573b2dfc827d.JPG"
        }, {
          thumbnail: "https://www.bradfordschool.cl/3w/cache/shortcodes/4-720x480-cccc4a8f454ee506cde2f42d11e751d7.jpg"
        }
      ],
      json:[{amountImages:4,
         directory:'1540913252877',
         title:'ALUMNA DE 6º BÁSICO OBTIENE TRES MEDALLAS EN COMPETENCIA INTERNACIONAL DE GIMNASIA',
         date:'12 de agosto 2018',}],

      urlImages:[]
      
    }
  }



  async componentDidMount(){
    /*
    const storageRef = firebase.storage().ref();
    console.log("este es->>>>>>>>>>>>>" + storageRef)
    const imageRef = firebase.storage().ref('images/1540831229393/imagen0.JPG')
    const sampleImage = await imageRef.getDownloadURL();
    console.log(String(sampleImage))
    this.setState({url:sampleImage})
    
    console.log("askldjaskdlasjdlasjd")

    data = this.state.json

    urls = []


    for (i=0; i < data[0].amountImages ; i++) {
      const imageRef = firebase.storage().ref('images/'+ data[0].directory + '/imagen' + i + '.jpg')
      const sampleImage = imageRef.getDownloadURL();
      var o = {url:sampleImage}
      urls.push(o)
    }
*/

    console.log("holaaaaaaaaa****************")
    

    data = this.state.json
    urls = []

    console.log(data)

    //const imageRef = firebase.storage().ref('images/1540831229393/imagen0.JPG')

  

    for (i=0; i < data[0].amountImages ; i++) {
      const imageRef = firebase.storage().ref('images/'+ data[0].directory + '/imagen' + i + '.jpg')
      await imageRef.getDownloadURL().then(function(url1) {
        console.log(url1);
        var o = {url:url1}
        urls.push(o)
        
      }, function(error){
        console.log(error);
      });
      this.setState({urlImages:urls})
      console.log(this.state.urlImages)
    }
   

   
  }

  handleSnapToItem(index){
    console.log("snapped to ", index)
  }

  _renderItem = ( {item, index} ) => {
    console.log("rendering,", index, item)
    return (
        <View >
            <Image style={styles.image} source={{ uri: item.url }} />
        </View>
    );
  }

  get pagination () {
    const { urlImages, activeSlide } = this.state;
    return (
        <Pagination
          dotsLength={urlImages.length}
          activeDotIndex={activeSlide}
          containerStyle={{ backgroundColor: 'transparent', paddingVertical:0, marginVertical:10  }}
          dotStyle={{
              width: 6,
              height: 6,
              borderRadius: 5,
              marginHorizontal: 5,
              backgroundColor: 'rgba(0, 2, 5, 0.92)'
          }}
          inactiveDotStyle={{
              // Define styles for inactive dots here
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
    );
}


/* 
          <View style={styles.news}>

            <View style={styles.bodyNew}>
              <Text style={styles.textBody}>
              ALUMNA DE 6º BÁSICO OBTIENE TRES MEDALLAS EN COMPETENCIA INTERNACIONAL DE GIMNASIA
              </Text>
            </View>

            <View style={styles.dateView}>
              <Text style={styles.dateText}>
                12 de Agosto 2018
              </Text>
            </View>

            <View style={styles.containerImages}>
              <Carousel
                ref={ (c) => { this._carousel = c; } }
                data={this.state.videos}
                renderItem={this._renderItem.bind(this)}
                onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                sliderWidth={width-40}
                itemWidth={width-40}
                layout={'default'}
                firstItem={0}
              />
              { this.pagination }
            </View>
            
          </View>

*/

 
  render(){ 
    return(
      <ScrollView style={styles.container}>
          <Header {...this.props} namePage="Noticias"/> 

          <View style={styles.news}>

            <View style={styles.bodyNew}>
              <Text style={styles.textBody}>
                {this.state.json[0].title}
              </Text>
            </View>

            <View style={styles.dateView}>
              <Text style={styles.dateText}>
                {this.state.json[0].date}
              </Text>
            </View>

            <View style={styles.containerImages}>
              <Carousel
                ref={ (c) => { this._carousel = c; } }
                data={this.state.urlImages}
                renderItem={this._renderItem.bind(this)}
                onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                sliderWidth={width-40}
                itemWidth={width-40}
                layout={'default'}
                firstItem={0}
              />
              { this.pagination }
            </View>

          </View>

          
        
      </ScrollView>
    );
    
    
  }
      

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image:{
    borderRadius:15,
    width:width-50,
    height: 250,
    marginHorizontal: 5,
    resizeMode: "contain",
    alignItems: 'center',
    
  },
  containerImages:{
    flex:1,
    width:width-50,
    height:100,
    backgroundColor:"transparent",
    alignItems: "center",
    alignSelf: "center",
    
  },
  news:{
    flex:1,
    backgroundColor:"#e0e0e0",
    marginVertical:5,
    height:360,
    width: width-20,
    borderRadius:10,
    alignSelf:"center",
    alignItems:"center"

  },
  bodyNew:{
    backgroundColor:"transparent",
    width:300,
    alignSelf:"center",
    alignContent:"center",
    alignItems:"center"

  },
  textBody:{
    padding:10,
    fontSize:15,
    alignSelf:"center",
    alignItems:"center",
    textAlign:"center",
    color:"black",
  },
  dateView:{
    alignSelf:"flex-start",
    paddingLeft:70,
  },

  dateText:{
    color:"green",
    fontSize:10,
  }
})