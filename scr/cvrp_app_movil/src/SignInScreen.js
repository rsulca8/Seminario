import React, {useContext, Component } from "react";
import {View, Text, StyleSheet, Image, Button, Alert, ImageBackground, TouchableOpacity, TextInput, ScrollView, }
from 'react-native'
import {AsyncStorage} from '@react-native-async-storage/async-storage'
import API from "./API"
import Header from './header'
import {AuthContext} from '../App'




function SignInScreen(){

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = useContext(AuthContext);

  var logear = () => {
    this.props.navigation.navigate('Loading')
  }
  console.log(username)
  return(
    <ImageBackground source = {require('../images/fondo.jpg')} style={styles.container}>
        <Header />
        <View style={styles.container}>
          <TextInput placeholder = 'Usuario' placeholderTextColor='white' maxLength = {8}
          style = {[styles.styleInput, {marginTop: 10, width: 200}]}
          value={username}
          onChangeText={setUsername}

          />
          <TextInput placeholder = 'Contraseña' placeholderTextColor='white' maxLength = {8}
          secureTextEntry={true}
          style = {[styles.styleInput, {marginTop: 20, width: 200}]}
          value={password}
          onChangeText={setPassword}
          />
          <View style = {[styles.styleBoton, {marginTop: 50}]}>
            <Button title="Login"
             onPress={() => {console.log("ENTRANDOOOO "+ username + password);signIn({ username, password })}} 
             />
          </View>

          <View style = {styles.styleText}>
            <Text style={{color: 'white', fontSize: 14}}> Or </Text>
          </View>

          <View style = {[styles.styleBoton, {marginTop: 15}]}>
            <Button title="Create User" />
          </View>

        </View>    
    </ImageBackground>    
)


}

const styles = StyleSheet.create({
    container : {
      flex: 1,
      // justifyContent: 'center',
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
export default SignInScreen