import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableHighlight, ScrollView, Button, TextInput } from 'react-native';
import * as axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { selectCedula } from '../Redux/Actions';

const Login = (props) => {
    const cedula = useSelector(state => state.cedula);
    const dispatch = useDispatch('');

    const handleCedula = (text) => {
        dispatch(selectCedula(text));
    }

    const handleButton = () => {
        consultarAPI();
    }

    const consultarAPI = () => {
        axios.get(`https://api-rest-juandavidposso295185.codeanyapp.com:443/dispositivoLlavero/cedula/${cedula}`).then((response) => {
            var array = response.data;
            if (array.length) {
                dispatch(selectCedula(cedula));
                props.navigation.navigate('BottomNavigation')
            }
        })
            .catch(function (error) {
                console.log(error);
            });
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

    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Cédula"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                onChangeText={handleCedula}
            />
            <Button
                title="Login"
                onPress={() => handleButton()}
            />
        </View>
    );


}

export default Login;
