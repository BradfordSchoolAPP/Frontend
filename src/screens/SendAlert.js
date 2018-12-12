import React from 'react';
import { Alert, Text, TextInput, StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome'
import MultiSelect from 'react-native-multiple-select';

import Header from '../components/Header'
import { Button } from 'react-native-elements';

const items = [{
    id: '92iijs7yta',
    name: 'Ondo',
  }, {
    id: 'a0s0a8ssbsd',
    name: 'Ogun',
  }, {
    id: '16hbajsabsd',
    name: 'Calabar',
  }, {
    id: 'nahs75a5sg',
    name: 'Lagos',
  }, {
    id: '667atsas',
    name: 'Maiduguri',
  }, {
    id: 'hsyasajs',
    name: 'Anambra',
  }, {
    id: 'djsjudksjd',
    name: 'Benue',
  }, {
    id: 'sdhyaysdj',
    name: 'Kaduna',
  }, {
    id: 'suudydjsjd',
    name: 'Abuja',
  }];

  

export default class SendAlert extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          drawerLabel: 'Enviar alerta',
          drawerIcon:  
          <Icon
            name="bell"
            color= "white"
            size={20} 
          />
        };
      };

    
    constructor(props) {
        super(props);

        this.inputRefs = {};

        this.state = {
            selectedItems: [],
            favColor: undefined,
            items: [
                {
                    label: 'Red',
                    value: 'red',
                    id:1,
                },
                {
                    label: 'Orange',
                    value: 'orange',
                    id:2,
                },
                {
                    label: 'Blue',
                    value: 'blue',
                    id:3
                },
            ],
            favSport: undefined,
            items2: [],
        };
        
        
    }

    
    onSelectedItemsChange = (selectedItems) => {
        this.setState({ selectedItems });
    }

    

    onChangeOptions(value,id){
        this.setState({
            items2: [
                {
                    label: 'Football',
                    value: 'football',
                },
                {
                    label: 'Baseball',
                    value: 'baseball',
                },
                {
                    label: 'Hockey',
                    value: 'hockey',
                },
            ]
        })

        console.log("añadiendo opciones" + value + "id" + id)
    }

    render() {
        const { selectedItems } = this.state;

        return (
            <View style={styles.container}>
                <Header {...this.props} namePage="Enviar alerta"/> 
                
                <View visible={false}>
                    <Text>What&rsquo;s your favorite color?</Text>
                    <RNPickerSelect
                        placeholder={{
                            label: 'Select a color...',
                            value: null,
                        }}
                        items={this.state.items}
                        onValueChange={(value,id) => {
                            this.setState({
                                favColor: value,
                            });
                            this.onChangeOptions(value,id)
                        }}
                        onUpArrow={() => {
                            this.inputRefs.name.focus();
                        }}
                        onDownArrow={() => {
                            this.inputRefs.picker2.togglePicker();
                        }}
                        style={{ ...pickerSelectStyles }}
                        value={this.state.favColor}
                        ref={(el) => {
                            this.inputRefs.picker = el;
                        }}
                    />
                </View>

                <View style={{ flex: 1 }}>
                    <MultiSelect
                    hideTags
                    items={items}
                    uniqueKey="id"
                    ref={(component) => { this.multiSelect = component }}
                    onSelectedItemsChange={this.onSelectedItemsChange}
                    selectedItems={selectedItems}
                    selectText="Pick Items"
                    searchInputPlaceholderText="Search Items..."
                    onChangeInput={ (text)=> console.log(text)}
                    altFontFamily="ProximaNova-Light"
                    tagRemoveIconColor="#CCC"
                    tagBorderColor="#CCC"
                    tagTextColor="#CCC"
                    selectedItemTextColor="#CCC"
                    selectedItemIconColor="#CCC"
                    itemTextColor="#000"
                    displayKey="name"
                    searchInputStyle={{ color: '#CCC' }}
                    submitButtonColor="#CCC"
                    submitButtonText="Confirmar"
                    />
                    <View>
                    {this.multiSelect && this.multiSelect.getSelectedItemsExt(selectedItems)}
                    </View>
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
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
});