import React from 'react';
import { StyleSheet, Text,TouchableHighlight,TextInput,ImageBackground, View, Button,Dimensions,Linking, ScrollView,Image} from 'react-native';


import Icon from 'react-native-vector-icons/FontAwesome'
import AwesomeAlert from 'react-native-awesome-alerts';


const {width,height} = Dimensions.get('window')
export default class RegisterScreen extends React.Component {

    constructor(props){
        super(props)
    
        this.state= {
            option:0,
            showButton:true,
            showButton2:false,
            showView:false,
			showAlert:false,
			loading: false,
            confirm: false,
            cancel:false,
            message: '',
            password:'',
            repeatPassword:'',
            email:'',
            pin:'',
        }
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

    _validate(){
        if(this.state.email === ""){
            this.setState({loading:false, confirm:true,cancel:false ,message:'Por favor ingresar el mail'})
            this.showAlert()
            this.setState({option:2})
        }
        else if(this.state.email === "Julio.serrano@usach.cl"){
            this.setState({option:1})
            this.setState({loading:true, confirm:false, cancel:false, message:'Verificando mail'})
            this.showAlert()
            setTimeout(()=>{
                this.setState({loading:false, confirm:true, cancel:false, message:"Su codigo de ingreso ha sido enviado a su mail"});
                this.showAlert()
            }, 4000);
        }
        else{
            this.setState({option:4})
            this.setState({loading:true, confirm:false, cancel:false,message:'Verificando mail'})
            this.showAlert()
            setTimeout(()=>{
                this.setState({loading:false, confirm:true, cancel:true, message:"Este mail no corresponde a un usuario del colegio bradford\\ ¿desea contactarse con el centro de padres?"});
                this.showAlert()
            }, 4000);
        }
    }

    _validate2(){
        if(this.state.email === "" || this.state.password === "" || this.state.repeatPassword === "" || this.state.pin === ""){ 
            this.setState({loading:false, confirm:true, cancel:false, message:'Por favor llenar todos los campos'})
            this.showAlert()
            this.setState({option:2})
        }
        else if(this.state.password !== this.state.repeatPassword){
            this.setState({loading:false, confirm:true, cancel:false, message:'Por favor llenar todos los campos'})
            this.showAlert()
            this.setState({option:2})
        }
        else{
            this.setState({option:3})
            this.setState({loading:true, confirm:false,cancel:false, message:''})
            this.showAlert()
            setTimeout(()=>{
                this.setState({loading:false, confirm:true, cancel:false,message:"El registro ha sido exitoso"});
                this.showAlert()
            }, 4000);  
        }    
    }

    function(){
        if(this.state.showView){
            return(
                <View>
                        <View style={styles.form}>
                            <Icon name="key" size={20} color="white" style={styles.inputIcon}/>
							<TextInput
									maxLength = {50}
									style={styles.input}
									placeholder = {'Ingrese pin'}
									placeholderTextColor = {'rgba(250,250,250,0.7)'}
									underlineColorAndroid = {'transparent'}
									keyboardType = 'numeric'
									onChangeText={(value) => this.setState({pin: value})}
								/> 
						</View>

                        <View style={styles.form}>
							<Icon name="lock" size={20} color="white" style={styles.inputIcon}/>
							<TextInput
									maxLength = {50}
									style={styles.input}
									placeholder = {'Nueva contraseña'}
									placeholderTextColor = {'rgba(250,250,250,0.7)'}
									underlineColorAndroid = {'transparent'}
                                    keyboardType = 'default'
                                    secureTextEntry = {true}
									onChangeText={(value) => this.setState({password: value})}
								/> 
						</View>

                        <View style={styles.form}>
							<Icon name="lock" size={20} color="white" style={styles.inputIcon}/>
							<TextInput
									maxLength = {50}
									style={styles.input}
									placeholder = {'Repetir contraseña'}
									placeholderTextColor = {'rgba(250,250,250,0.7)'}
									underlineColorAndroid = {'transparent'}
                                    keyboardType = 'default'
                                    secureTextEntry = {true}
									onChangeText={(value) => this.setState({repeatPassword: value})}
								/> 
						</View>
                </View>
            )
        }
    }

    function2(){
        if(this.state.showButton){
            return(
                <View style={styles.botones}>
                    <TouchableHighlight 
                        underlayColor="transparent"
                        style={styles.login}
                        onPress={() => this._validate()}
                        >
                        
                        <Text style={styles.text}> Solicitar clave </Text>
                    </TouchableHighlight>
                </View>
            )

        }
    }

    function3(){
        if(this.state.showButton2){
            return(
                <View style={styles.botones}>
                    <TouchableHighlight 
                        underlayColor="transparent"
                        style={styles.login}
                        onPress={() => this._validate2()}
                        >
                        
                        <Text style={styles.text}> Guardar contraseña </Text>
                    </TouchableHighlight>
                </View>
            )

        }
    }

    render() {
		const {showAlert} = this.state;
    	return (
			<ImageBackground
				style={styles.container}
				blurRadius={1.5} 
				source={require('../images/Rectangle.png')}
			>

				<ScrollView>

                    <View>
						<Text style={styles.title}>Registro</Text>
						</View>
						<View style={styles.form}>
							<Icon name="envelope" size={20} color="white" style={styles.inputIcon}/>
							<TextInput
									maxLength = {50}
									style={styles.input}
									placeholder = {'Correo electronico'}
									placeholderTextColor = {'rgba(250,250,250,0.7)'}
									underlineColorAndroid = {'transparent'}
									keyboardType = 'default'
									onChangeText={(value) => this.setState({email: value})}
								/> 
						</View>

                        <View> 
                            {this.function()}
                        </View>

                        <View>
                            {this.function2()}
                        </View>

                        <View>
                            {this.function3()}
                        </View>
				</ScrollView>

				<AwesomeAlert
					show={showAlert}
					showProgress={this.state.loading}
					message={this.state.message}
					closeOnTouchOutside={true}
					closeOnHardwareBackPress={false}
					showCancelButton= {this.state.cancel}
					showConfirmButton={this.state.confirm}
					cancelText="cancelar"
					confirmText="Aceptar"
                    confirmButtonColor="#3CA53D"
					style
					onCancelPressed={() => {
                        this.hideAlert()
						
					}}
					onConfirmPressed={() => {
                        if(this.state.option === 1){
                            this.hideAlert();
                            this.setState({showView:true});
                            this.setState({showButton:false});
                            this.setState({showButton2:true});
                        }
                        else if(this.state.option == 2){
                            this.hideAlert();
                        }
                        else if(this.state.option == 3){
                            this.hideAlert();
                            {this.props.navigation.navigate('Home')}
                        }
                        else if(this.state.option == 4){
                            Linking.openURL('mailto:Bradford?subject=Solicitud de registro') 
                        }
                        
					}}
				/>

      		</ImageBackground>
    );
  }
}
      




const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		//padding: 10,
	},
	form: {
		alignItems: "stretch",
		alignSelf:"center",
		padding:15,
		marginBottom:-20,
	},
	title: {
		color:'white',
		fontSize:40,
		textAlign:"center",
        marginVertical:50,
        top:20,
	},

	input:{
		width:width*0.7,
		height:40,
		fontSize:18,
		marginBottom: 10,
		paddingLeft: 44,
		borderBottomColor: 'white',
		borderBottomWidth: 1,
		color:'rgba(250,250,250,0.7)'
	},
	inputIcon:{
		position:'absolute',
		top:22,
		left:30
	},
	text:{
		color:"white",
		fontSize:18
	},
	login:{
		alignItems:'center',
		alignSelf:'center',
		justifyContent:'center',
		width:width*0.60,
		height:40,
		backgroundColor:"#3CA53D",
		opacity: 10,
		borderRadius:15,
		marginVertical:5,
	},
	botones:{
		marginTop:30,
	}

})