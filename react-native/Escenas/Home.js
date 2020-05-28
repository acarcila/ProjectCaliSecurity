import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableHighlight } from 'react-native';
import * as axios from 'axios';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            distancia: 20
        }
    }

    render() {
        var alerta;
        if (this.state.distancia <= 5) {
            alerta = <View style={styles.alertaContainerActivo}><Text style={styles.tAlerta}>Parar</Text></View>;
        }
        else {
            alerta = <View style={styles.alertaContainerInactivo}><Text style={styles.tAlerta}>Seguir</Text></View>;
        }

        return (
            <View style={styles.container}>
                <Text style={styles.tAlerta}>distancia: {this.state.distancia} cm</Text>                
                {alerta}
            </View>
        );
    }

    consultarDistancia() {
        axios.get('http://11.11.8.170:8080/distancia/1').then((response) => {
            var array = response.data;
            var distancia;

            if (array.length > 0) {
                distancia = array[0].valor;

                if (distancia != this.state.distancia) {
                    this.setState(previousState => (
                        { distancia: distancia }
                    ));
                }
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        this.interval = setInterval(() => this.consultarDistancia(), 1000);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
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
});