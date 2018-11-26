

import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native'


import * as firebase from 'firebase';

import Carousel, { Pagination } from 'react-native-snap-carousel';

const {width,height} = Dimensions.get('window')
export default class New extends Component{

    constructor(props) {
        super(props);
        console.ignoredYellowBox = [
          'Setting a timer'
          ];
        this.state = {
          url:null,
          activeSlide:0,
    
          urlImages:[],
          urlImages2:[]
          
        }
      }
    
    
    
    componentWillMount(){    
        data = this.props.dataJson
        console.log(data)

        for (i=0; i < data.img_num ; i++) {
          try{
            const imageRef = firebase.storage().ref('images/'+ data.img_dir + '/imagen' + i + '.jpg')
            imageRef.getDownloadURL().then((url) => {
              this.setState({
                urlImages:this.state.urlImages.concat([url])
              })   
            
            });
          }
          catch(error){
            console.log(error)
          }
        } 
    }

    
    getUrlImages(img_dir,image,callback){
      const imageRef = firebase.database().ref('images/'+img_dir +'/'+image + '/').on('value', (snapshot) => {
        let imagURL = ''
        if(snapshot.val()){
          imageURL = snapshot.val()
        }
        
        callback(imageURL)
      })
    }

    /*
    componentWillMount(){
      data = this.props.dataJson
      console.log(data)
      console.log("********aqui")


      for (i=0; i < data.img_num ; i++) {
        try{
          this.getUrlImages(data.img_dir,i, (imageURL) => {
            this.setState({
              urlImages:this.state.urlImages.concat([imageURL])
            })   
          })
        }
        catch(error){
          console.log(error)
        }
      }
     
    }*/
    
    handleSnapToItem(index){
      console.log("snapped to ", index)
    }
  
    _renderItem = ( {item, index} ) => {
      console.log("rendering,", index, item)
      return (
        <View >
          <Image style={styles.image} source={{ uri: item }} />
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
                backgroundColor: '#009688'
            }}
            inactiveDotStyle={{
                // Define styles for inactive dots here
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
      );
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


    render(){

        //console.log("asdkjs" + this.state.urlImages)
        return(
            <View style={styles.news}>

                <View style={styles.bodyNew}>
                    <Text style={styles.textBody}>
                    {this.props.dataJson.title}
                    </Text>
                </View>

                <View style={styles.dateView}>
                    <Text style={styles.dateText}>
                    {this.formatDate(new Date(this.props.dataJson.date))}
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
        )
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
        backgroundColor:"white",
        marginVertical:5,
        height:360,
        width: width-20,
        borderRadius:10,
        alignSelf:"center",
        alignItems:"center"
    
      },
      bodyNew:{
        backgroundColor:"transparent",
        width:320,
        alignSelf:"center",
        alignContent:"center",
        alignItems:"center"
    
      },
      textBody:{
        padding:10,
        fontSize:15,
        fontWeight: "bold",
        alignSelf:"center",
        alignItems:"center",
        textAlign:"left",
        color:"black",
      },
      dateView:{
        backgroundColor:"transparent",
        width:320,
        alignSelf:"center",
      },
    
      dateText:{
        color:"green",
        textAlign:"left",
        fontSize:12,
        padding:10
      }

})

