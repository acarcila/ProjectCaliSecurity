import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
import * as axios from 'axios';
import { Table, Row, Rows } from 'react-native-table-component';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';

const Acoso = (props) => {
    const cedula = useSelector(state => state.cedula);
    const [data, setData] = useState([]);

    useEffect(() => {
        consultarAPI();
    }, [cedula])

    const consultarAPI = () => {
        axios.get(`https://api-rest-juandavidposso295185.codeanyapp.com:443/dispositivoLlavero/registros/acoso/cedula/${cedula}`).then((response) => {
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

                var stringFecha = dia + "/" + mes + "/" + anio;

                var hora = fecha.getHours();
                var minutos = fecha.getMinutes();

                var stringHora = hora + ":" + minutos;

                arregloFinal[i] = { fecha: stringFecha, hora: stringHora, urgencia, ubicacion: { latitude: element.ubicacionLat, longitude: element.ubicacionLon } };
                i += 1;
            });
            if (arregloFinal != data) {
                setData(arregloFinal);
            }


        })
            .catch(function (error) {
                console.log(error);
            });
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
        },
        scrollView: {
            paddingTop: 50,
            backgroundColor: '#000',
            alignSelf: 'stretch',
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
        mapStyle: {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        },
    });

    return (
        <View style={styles.container}>
            <MapView style={styles.mapStyle}
                initialRegion={{
                    latitude: 3.440085,
                    longitude: -76.517916,
                    latitudeDelta: 0.2,
                    longitudeDelta: 0.0421,
                }}
            >
                {data.map((element, i) => {
                    return (
                        <Marker
                            coordinate={element.ubicacion}
                            title={`urgencia: ${element.urgencia}`}
                            description={`fecha: ${element.fecha} ${element.hora}`}
                            key={i}
                        />);
                })}
            </MapView>
        </View>
    );
}

export default Acoso;

