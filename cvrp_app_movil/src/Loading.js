import React, { Component } from "react";
import {View, Text, StyleSheet, Image, Button, Alert, ImageBackground, TouchableOpacity, TextInput, ScrollView, }
from 'react-native'

import Login from './Login'



const Loading = () => {
    return(

        <View onStartShouldSetResponder={}>
            <Text>CARGANDO...</Text>
        </View>
    )
}

export default Loading