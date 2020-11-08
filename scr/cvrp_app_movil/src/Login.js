import React, { Component } from "react";
import {View, Text, StyleSheet, Image, Button, Alert, ImageBackground, TouchableOpacity, TextInput, ScrollView, }
from 'react-native'
import {AsyncStorage} from '@react-native-async-storage/async-storage'
import API from "./API"
import Header from './header'
import Body from './body'

class Login extends Component{

    constructor(props){
        super(props)
        this.state = {
            user: '',
            password: '',
        }
    }

    // método anónimo?? :D 
    navegar = async (param) => {
        if(param == 'Loading'){
            let userLogin = {
                user : this.state.user,
                perm: true
            }
            AsyncStorage.setItem("userLogin", JSON.stringify(userLogin))
            this.props.navigation.navigate(params)
        }
        else{
            this.props.navigation.navigate(param)
        }
    }

    render(){
        return(
            <ImageBackground source = {require('../images/fondo.jpg')} style={styles.container}>
                <Header />
                <Body />            
            </ImageBackground>    
        )
    }

}

const styles = StyleSheet.create({
    container : {
      flex : 1,
      flexDirection : 'column'
    },
    footer : {
      flex : 1,
      flexDirection : 'row'
    },
    flex : {
      flex : 1
    },
    footerLeft : {
      alignItems : 'center',
      justifyContent : 'center'
    },
    footerCenter : {
      alignItems : 'center',
      justifyContent : 'center'
    },
    footerRight : {
      alignItems : 'flex-end',
      justifyContent : 'center'
    },
    textColor : {
      color : 'white'
    }
  })
export default Login