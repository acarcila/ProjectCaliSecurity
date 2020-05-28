import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import * as axios from 'axios';
import Alerta from '../Componentes/Alerta';

export default class Alertas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tableHead: ['Fecha', 'Hora'],
            alertas: []
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                        <Row data={this.state.tableHead} style={styles.head} textStyle={styles.tHeader} />
                        <Rows data={this.state.alertas} textStyle={styles.tAlerta} />
                    </Table>
                </ScrollView>
            </View>
        );
    }

    consultarAlertas() {
        axios.get('http://11.11.8.170:8080/infrarrojo/1').then((response) => {
            var array = response.data;
            var arregloFinal = [];
            var i = 0;
            array.forEach(element => {
                var timeStamp = element.fecha;
                var fecha = new Date(timeStamp * 1000);
                var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                var anio = fecha.getFullYear();
                var mes = months[fecha.getMonth()];
                var dia = fecha.getDate();

                var stringFecha = anio + "/" + mes + "/" + dia;

                var hora = fecha.getHours();
                var minutos = fecha.getMinutes();

                var stringHora = hora + ":" + minutos;

                arregloFinal[i] = [stringFecha, stringHora];
                i += 1;
            });
            if (arregloFinal != this.state.alertas) {
                this.setState(previousState => (
                    { alertas: arregloFinal }
                ));
            }


        })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        this.consultarAlertas();
        this.interval = setInterval(() => this.consultarAlertas(), 5000);
    }


}

function ListaAlertas(props) {
    var alertas = props.alertas;
    var i = 0;
    const listItems = alertas.map((alerta) => {
        i += 1;
        return (<Alerta key={i} alerta={alerta} />);
    });

    return <View style={styles.container}>{listItems}</View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
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