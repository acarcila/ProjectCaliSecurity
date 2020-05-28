import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableHighlight } from 'react-native';

export default class Alerta extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.contenedorTexto}>
                    <Text style={styles.tAlerta}>{this.props.alerta.fecha}</Text>
                </View>
                <View>
                    <Text style={styles.tAlerta}>{this.props.alerta.hora}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'stretch',
        justifyContent: 'space-around',
    },
    contenedorTexto: {
        paddingHorizontal: 30,

    },
    tAlerta: {
        fontSize: 20,
        color: '#fff',
    },
});