import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
import * as axios from 'axios';
import { Table, Row, Rows } from 'react-native-table-component';


export default class Acoso extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cedula: 1234567,
            tableHead: ['Fecha', 'Hora', "Urgencia", "Ubicación"],
            tableData: [],
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                        <Row data={this.state.tableHead} style={styles.head} textStyle={styles.tHeader} />
                        <Rows data={this.state.tableData} textStyle={styles.tAlerta} />
                    </Table>
                </ScrollView>
            </View>
        );
    }


    consultarAPI() {
        axios.get(`https://api-rest-juandavidposso295185.codeanyapp.com:443/dispositivoLlavero/registros/acoso/cedula/${this.state.cedula}`).then((response) => {
            var array = response.data;
            var arregloFinal = [];
            var i = 0;
            array.forEach(element => {
                var urgencia = element.urgencia;
                var ubicacion = `${element.ubicacionLat}, ${element.ubicacionLon}`;
                var timestamp = element.timestamp;
                var fecha = new Date(timestamp * 1000);
                var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                var anio = fecha.getFullYear();
                var mes = months[fecha.getMonth()];
                var dia = fecha.getDate();

                var stringFecha = anio + "/" + mes + "/" + dia;

                var hora = fecha.getHours();
                var minutos = fecha.getMinutes();

                var stringHora = hora + ":" + minutos;

                arregloFinal[i] = [stringFecha, stringHora, urgencia, ubicacion];
                i += 1;
            });
            if (arregloFinal != this.state.tableData) {
                this.setState(previousState => (
                    { tableData: arregloFinal }
                ));
            }


        })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        this.consultarAPI();
    }
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