import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
// import { StyleSheet, Text, View, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
// import Home from '../Escenas/Home';
// import Alertas from '../Escenas/Alertas';
import Robo from '../Escenas/Robo';
import Acoso from '../Escenas/Acoso';

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Robo" component={Robo} />
            <Tab.Screen name="Acoso" component={Acoso} />
        </Tab.Navigator>
    );
}

// const BottomNavigation = () => {
//     <View>
//     </View>
// };