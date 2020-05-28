import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableHighlight, ScrollView, Button, TextInput } from 'react-native';
import * as axios from 'axios';
import { Table, Row, Rows } from 'react-native-table-component';



export default class Robo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cedula: 1234567,
        }
    }

    handleCedula = (text) => {
        this.setState({ cedula: text })
    }

    handleButton = () => {
        this.consultarAPI();
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Cédula"
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    onChangeText={this.handleCedula}
                />
                <Button
                    title="Login"
                    onPress={() => this.handleButton()}
                />
            </View>
        );
    }


    consultarAPI() {
        axios.get(`https://api-rest-juandavidposso295185.codeanyapp.com:443/dispositivoLlavero/cedula/${this.state.cedula}`).then((response) => {
            var array = response.data;
            if (array.length) {
                this.props.navigation.navigate('BottomNavigation')
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    // componentDidMount() {
    //     this.consultarAPI();
    // }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    scrollView: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#000',
        width: Dimensions.get('window').width,
    },
    alertaContainerActivo: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').width * 0.4,
        padding: 25,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    alertaContainerInactivo: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').width * 0.4,
        padding: 25,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tAlerta: {
        fontSize: 20,
        color: '#fff',
    },
    tHeader: {
        fontSize: 25,
        color: '#fff',
        fontWeight: '700',
    },
});