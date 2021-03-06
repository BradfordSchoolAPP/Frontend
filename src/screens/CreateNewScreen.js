import React from 'react';
import { StyleSheet, Text,TouchableHighlight, TextInput,View, Button,Dimensions, ScrollView,Image,Modal} from 'react-native';



import Icon from 'react-native-vector-icons/FontAwesome'
import ImageBrowser from '../camera/ImageBrowser';
import Header from '../components/Header'
import * as firebase from 'firebase';
import { CheckBox } from 'react-native-elements'
import AwesomeAlert from 'react-native-awesome-alerts';

const {width,height} = Dimensions.get('window')

export default class CreateNewScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerleft: null,
      drawerLabel: 'Crear noticia',
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
    this.state = {
      imageBrowserOpen: false,
      photos: [],
      height:0,
      checked: false,
      title:'',
      details:'',
      img_dir:'',
      showAlert: false,
      loading: true,
      confirm: false,
      message: '',
      fullDates:false
      
    }
  }

  uploadImages = async (uri,name)=> {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase.storage().ref().child("images/"+ this.state.img_dir +"/" + name);
    return ref.put(blob);
  }

  async upload(){
    if(this.state.title === '' || this.state.details === '' || this.state.photos.length === 0 ){
      console.log("faltan campos aun")
      this.setState({loading:false,confirm:true,message:"Existen campos vacios. Por favor, ingrese todos los cmapos."})
      this.showAlert()
    }
    else{
      this.setState({fullDates:true})
      await this.state.photos.map((item,i) => 
        this.uploadImages(item.file,"imagen" + i + ".jpg")
      )
      this.setState({loading:true, confirm:false, message:"Ingresando noticia"})
      this.showAlert()
      this.send()
      setTimeout(()=>{this.setState({loading:false, confirm:true, message:"Noticia guardada exitosamente"});}, 10000);
    } 
    
    
  }

  send(){
    fetch('http://191.115.199.185/api/v1/news', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: this.state.title,
      details: this.state.details,
      important: this.state.checked,
      img_dir: this.state.img_dir,
      img_num: this.state.photos.length
    }),
  });
  }
  





  imageBrowserCallback = (callback) => {
    callback.then((photos) => {
      console.log(photos)
      this.setState({
        imageBrowserOpen: false,
        photos
      })
    }).catch((e) => console.log(e))
  }

  renderImage(item, i) {
    return(
      <Image
        style={{height:100, width: 100,alignSelf: 'stretch'}}
        source={{uri: item.file}}
        key={i}
      />
    )
  }

  componentWillMount(){
    date= Date.now()
    this.setState({img_dir:date})
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
        this.props.navigation.navigate('Home')
    }
    else{
        this.hideAlert()
    }
}






  render(){
    return(
        <View style={styles.container}>

            <Modal visible={this.state.imageBrowserOpen}
                    onRequestClose={()=>console.log("cerrando")}>
              <ImageBrowser max={4} callback={this.imageBrowserCallback}/>
            </Modal>
            
            <Header {...this.props} namePage="Crear noticia"/> 

            <View style={styles.form}>
                <TextInput
                        style={styles.input}
                        placeholder = {'Título noticia'}
                        multiline={true}
                        placeholderTextColor = {'grey'}
                        underlineColorAndroid = {'transparent'}
                        keyboardType = 'default'
                        onChangeText={(value) => this.setState({title: value})}
                        onContentSizeChange={(event) => {
                          this.setState({ heightAux: event.nativeEvent.contentSize.heightAux })
                        }}
                        style={[styles.input, {height: Math.max(35, this.state.heightAux)}]}
                    /> 
            </View>
            <View style={styles.form}>
                <TextInput
                        style={styles.input}
                        placeholder = {'Descripción'}
                        multiline={true}
                        placeholderTextColor = {'grey'}
                        underlineColorAndroid = {'transparent'}
                        keyboardType = 'default'
                        onChangeText={(value) => this.setState({details: value})}
                        onContentSizeChange={(event) => {
                          this.setState({ heightAux: event.nativeEvent.contentSize.heightAux })
                        }}
                        style={[styles.input, {height: Math.max(35, this.state.heightAux)}]}
                        
                    /> 
            </View>
            
            <View style={styles.checkbox}>
              <CheckBox
                title="Noticia importante"
                checked={this.state.checked}
                onPress={() => this.setState({ checked: !this.state.checked })}
              />
            </View>
            
            
            
            <View style={styles.containerImages}>
              
              <View style={styles.header}>
                  <TouchableHighlight
                      onPress={() => this.setState({imageBrowserOpen: true})}
                      style = {styles.bottom}
                  >
                      <Text style= {styles.text}>
                          Elegir imágenes
                      </Text>
                  </TouchableHighlight> 
              </View>

              <ScrollView
                  horizontal={true}
                  contentContainerStyle={{flexGrow: 1, justifyContent:"center"}}
                  style={styles.images}
                  automaticallyAdjustContentInsets={false}
                  directionalLockEnabled={true}>
                  {this.state.photos.map((item,i) =>
                      <View key={i}>
                          <TouchableHighlight key={i}>
                              <Image style={styles.image} source={{ uri: item.file }} key={i}/>
                          </TouchableHighlight>
                      </View>
                  )}
              </ScrollView>
            </View>
            
            
            <View style={styles.header}>
              <TouchableHighlight
                    style= {styles.bottom}
                    onPress={() => {this.upload()} } 
                >
                    <Text style= {styles.text}>
                        Guardar noticia
                    </Text>
                
                </TouchableHighlight>
            </View>
            
            <AwesomeAlert
                show={this.state.showAlert}
                showProgress={this.state.loading}
                message={this.state.message}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                //showCancelButton={true}
                showConfirmButton={this.state.confirm}
                cancelText="No, cancel"
                confirmText="Aceptar"
                confirmButtonColor="green"
                style
                onCancelPressed={() => 
                    {this.props.navigation.navigate('Home')}
                }
                onConfirmPressed={() => 
                  {this.options()}
                }
            />

        </View>

    );
  }
      

}

const styles = StyleSheet.create({
    form: {
        alignItems: "stretch",
        padding:15,
        marginBottom:-10,
        alignContent:"center",
        alignSelf:"center"
    },
      container: {
        flex: 1,
        backgroundColor: 'white',
      
      },
      input:{
        width:width*0.75,
        height:40,
        fontSize:18,
        marginBottom: 10,
        paddingLeft: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        color:'black',
        maxHeight: 80
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
        alignItems:"center"
      },
      text: {
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center'
      },
      header: {
        alignItems: 'center',
        alignSelf:"center",
        marginVertical:10,
      
      },
      image:{
        width: 150,
        height: 150,
        marginHorizontal: 5,
        resizeMode: "contain",
       
      },
      images:{
        marginVertical:15,
        height:100,
        alignContent:"center"
      },
      containerImages:{
        marginVertical:10,
        width:width-10,
        alignSelf:"center",
        borderWidth:1,
        borderColor:"grey",
        borderRadius:10,
        backgroundColor:"transparent",
      },
      checkbox:{
        width:200,
        alignSelf:"center"
      }
})