import React from 'react'
import { View , Text, StyleSheet, Image, Button, TextInput, Alert} from 'react-native'

// Declaracion de funcion AppLayout
function body(props){

  var loginCheck = () => Alert.alert('Simple Button pressed')
  var createUser = () => Alert.alert('terminar aqui mañana... pvto el q lee')
  return(
    <View style={styles.container}>
      <TextInput placeholder = 'Usuario' placeholderTextColor='white' maxLength = {8}
      style = {[styles.styleInput, {marginTop: 10, width: 200}]}
      />
      <TextInput placeholder = 'Contraseña' placeholderTextColor='white' maxLength = {8}
      secureTextEntry={true}
      style = {[styles.styleInput, {marginTop: 20, width: 200}]}
      />
      <View style = {[styles.styleBoton, {marginTop: 50}]}>
        <Button title="Login" onPress={loginCheck}/>
      </View>

      <View style = {styles.styleText}>
        <Text style={{color: 'white', fontSize: 14}}> Or </Text>
      </View>

      <View style = {[styles.styleBoton, {marginTop: 15}]}>
        <Button title="Create User" onPress={createUser}/>
      </View>

    </View>
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


export default body