import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableHighlight,
    Dimensions
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
const {width,height} = Dimensions.get('window')
export default class Header extends Component{

    constructor(props) {
        super(props);
        this.state = {
          name:this.props.navigation.state.name,
        }
      }

    render(){
        return(
                <View style={styles.container}> 
                    <TouchableWithoutFeedback
                        onPress={() => {
                        const { navigate } = this.props.navigation.openDrawer();
                        }
                    }>
                        <Icon
                            style ={styles.icon}
                            name="bars"
                            color= "white"
                            size={20}
                        />
                    </TouchableWithoutFeedback>
                        
                    <Text style={styles.text}>
                        {this.props.namePage}
                    </Text>                   
                   
                </View>
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        paddingHorizontal:15,

    },
    container:{
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

