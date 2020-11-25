import React, { Component } from 'react'
import { ImageBackground, StyleSheet, View, TextInput, Image, Button, Alert} from 'react-native';
import { Container , Text , Header} from 'native-base';
import API from './API';
import { cos } from 'react-native-reanimated';
const image = require('../images/fondo.jpg');

class createUser extends Component{
  constructor(props) {
    super(props);
    this.state = {
      nombre : '',
      apellido : '',
      email : '',
      usuario : '',
      contraseña : '',
      contraseña_confirm : '',
    }
    
  }

  getDatosIngresados = () =>{
    var s = this.state
    return {
      nombre : s.nombre,
      apellido : s.apellido,
      email : s.email,
      usuario : s.usuario,
      contraseña : s.contraseña,
      contraseña_confirm : s.contraseña_confirm,
    }
  }

  login = () => {
    this.props.navigation.navigate('Login')
  }

  
  newUser(){
    var datosIngresados = this.getDatosIngresados()
    var valores = Object.values(datosIngresados)
    var mapeo = valores.map((key) => {return key == ""}) //Se verifica que no hay valores nulos
    var filtro = mapeo.filter((val) => {return val == true} ) //No tiene que haber falsos
    console.log(valores)
    console.log(filtro)
    if(filtro.length == 0){
        console.log("contraseña: "+ datosIngresados.contraseña)
        console.log("contraseña confirm: "+ datosIngresados.contraseña_confirm)
        if(datosIngresados.contraseña == datosIngresados.contraseña_confirm){
          console.log("antes de datos")
          var datos = API.createUser(
            datosIngresados.nombre,
            datosIngresados.apellido,
            datosIngresados.email,
            datosIngresados.usuario,
            datosIngresados.contraseña
          )
          console.log(datos)
        }
        else{
          alert("Las contraseñas no coinciden")
        }
     }
    else{
      alert("debe completar todos los campos")
    }
  }

  render() {
    return(
      <Container style={{backgroundColor: 'black'}}>
        <ImageBackground source = {image} style={styles.container}>

        {/* Cuerpo */}
        <View style={styles.container}>
          <TextInput placeholder = 'Nombre' placeholderTextColor='white' maxLength = {8}
          style = {[styles.styleInput, {marginTop: 40, width: 200}]}
          onChangeText = {(value)=>{this.setState({nombre: value})}}
          />
          <TextInput placeholder = 'Apellido' placeholderTextColor='white' maxLength = {8}
          style = {[styles.styleInput, {marginTop: 20, width: 200}]}
          onChangeText = {(value)=>{this.setState({apellido: value})}}
          />
          <TextInput placeholder = 'Email' placeholderTextColor='white' maxLength = {8}
          style = {[styles.styleInput, {marginTop: 20, width: 200}]}
          onChangeText = {(value)=>{this.setState({email: value})}}
          />
          <TextInput placeholder = 'Usuario' placeholderTextColor='white' maxLength = {8}
          style = {[styles.styleInput, {marginTop: 20, width: 200}]}
          onChangeText = {(value)=>{this.setState({usuario: value})}}
          />
          <TextInput placeholder = 'Password' placeholderTextColor='white' maxLength = {8}
          secureTextEntry={true}
          style = {[styles.styleInput, {marginTop: 20, width: 200}]}
          onChangeText = {(value)=>{this.setState({contraseña: value})}}
          />
          <TextInput placeholder = 'Confirm Password' placeholderTextColor='white' maxLength = {8}
          secureTextEntry={true}
          style = {[styles.styleInput, {marginTop: 20, width: 200}]}
          onChangeText = {(value)=>{this.setState({contraseña_confirm: value})}}
          />

        <View style = {{flexDirection: 'row'}}>
          <View style = {[styles.styleBoton, {marginTop: 50}]}>
            <Button title="Cancelar" onPress={this.login}/>
          </View>
          <View style = {[styles.styleBoton, {marginTop: 50}]}>
            <Button title="Crear" onPress={() => {this.newUser(this)}}/>
          </View>
        </View>

        </View>

        </ImageBackground>
      </Container>
    );
  }
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
    marginRight: 10,
    marginLeft: 10,
    width: 100
  },
  styleInput: {
    borderWidth: 1,
    color: 'white',
    borderColor: 'white',
    padding: 5
  }

})

export default createUser

