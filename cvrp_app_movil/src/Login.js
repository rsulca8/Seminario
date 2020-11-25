import React, { Component, useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, TextInput, Image, Button, Alert} from 'react-native';
import { Container} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from "./API";
import AuthContext from "./AuthContext"


const image = require("../images/fondo.jpg");
const Login = ({navigation}) => {

  const { signIn } = React.useContext(AuthContext);
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');

  loginCheck = async () => {
    var resp = await API.checkLogin(user, password);

    console.log(JSON.stringify(resp))
    switch(resp.resp){
      case "OK":
        alert("OK");
        user_data = await API.getUserInfo(user);
        signIn(user_data);
        navigation.navigate('Home')
        break;
      case "contraseña incorrecta":
        alert("contraseña incorrecta");
        break;
      case "usuario incorrecto":
        alert("usuario incorrecto");
        break;
    }
  }

  createUser = () => {
    navigation.navigate('CreateUser')
  }


  return (
      <Container style={{backgroundColor: 'black'}}>
        <ImageBackground source = {image} style={styles.container}>

        {/* Cabecera */}
        <View style={styles.containerHeader}>
          <View style={styles.headerLeft}>
            <Image source={require('../assets/favicon.png')} 
            style={styles.logo}></Image>
          </View>
            <Text style={ {color: 'white'} } > CVRP </Text>
        </View>

        {/* Cuerpo */}
        <View style={styles.container}>
          <TextInput placeholder = 'Usuario' placeholderTextColor='white' maxLength = {8}
          style = {[styles.styleInput, {marginTop: 10, width: 200}]}
          onChangeText = {(valor) => setUser(valor)}
          />
          <TextInput placeholder = 'Contraseña' placeholderTextColor='white' maxLength = {8}
          secureTextEntry={true}
          style = {[styles.styleInput, {marginTop: 20, width: 200}]}
          onChangeText = {(valor) => setPassword(valor)}
          />
        
        <View style = {[styles.styleBoton, {marginTop: 50}]}>
          <Button title="Login" onPress={()=>{loginCheck()}}/>
        </View>

        <View style = {styles.styleText}>
          <Text style={{color: 'white', fontSize: 14}}> Or </Text>
        </View>

        <View style = {[styles.styleBoton, {marginTop: 15}]}>
          <Button title="Create User" onPress={() => createUser()}/>
        </View>

        </View>

        </ImageBackground>
      </Container>
  );

}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center'
  },
  containerHeader: {
    flex: 0.5,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  styleText:{
    marginTop: 10,
    alignItems: 'center'
  },
  styleBoton: {
    width: 130
  },
  styleInput: {
    borderWidth: 1,
    color: 'white',
    borderColor: 'white',
    padding: 5
  }

})

export default Login