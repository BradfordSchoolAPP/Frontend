import React ,{PureComponent} from 'react';
import { StyleSheet, Text, View , AsyncStorage, ActivityIndicator} from 'react-native';


import { createStackNavigator} from 'react-navigation';
import ApiKeys from './src/constants/ApiKeys';
import * as firebase from 'firebase';
import DetailsNew from './src/screens/DetailsNew'
import HomeScreen from './src/screens/HomeScreen'
import New from './src/components/New'
import {connect} from 'react-redux'
import StackNavigator from './src/navigation/StackNavigator'
import { actionCreator } from './src/components/HomePage';



/*credentials build
Keystore password: 75cc1bcb2bb644f0b82f442cb9ed00b3
  Key alias:         QGp1bGlvc2VycmFuby9jZW50cm8tZGUtcGFkcmVz
  Key password:      4e065bb5508847d4bf19567f3e12cd76
*/
class AppRoot extends PureComponent {

  _isMounted = false;


  constructor(props) {
    super(props);

    this.state ={
      admin:null
    }

    // Initialize firebase...
    if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }
  }

  componentDidMount(){
    this.props.checkLogin();
  }

  
  render() {
    //return <Stack />;
    const {app_started, authenticated, user_type} = this.props.authState
    return app_started ? this._renderAppRoot(authenticated,user_type) : this._renderSplash(app_started);
  } 

  _renderSplash(app_started){
    return (
      <View >
        <ActivityIndicator size= "large" animating = {app_started} />
        <Text children='loading...' />
      </View>
    )
  }

  _renderAppRoot(authenticated,user_type){
    console.log("user type"+ user_type)
    console.log("authenticated" + authenticated)
    let user
    if(user_type == 1){
      console.log("admin")
      user = true
    }
    else if (user_type == 2){
      console.log("apoderado")
      user  = false
    }
    const CreateRoot = StackNavigator(authenticated,user);
    return <CreateRoot/>
  }
}


//prueba release


const mapDispatchToProps = (dispatch, ownProps) => {
  return{
    async checkLogin(){
      const isLoggin = await AsyncStorage.getItem('authenticated').catch(e=> console.log(e))
      const user_type = await AsyncStorage.getItem('user_type').catch(e=> console.log(e))

      if(isLoggin){
        dispatch(actionCreator('LOGIN_SUCCESS',user_type))
      }
      dispatch(actionCreator('APP_LOADED'))
    }
      
  }
}


const mapStateToProps = (state,ownProps) => {
  return {
    authState: state.authState
  }
}




export default connect(mapStateToProps,mapDispatchToProps)(AppRoot)







