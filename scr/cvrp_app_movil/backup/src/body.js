import React from 'react'
import { View , Text, StyleSheet, Image, Button, TextInput, Alert} from 'react-native'
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
// Declaracion de funcion AppLayout
function body(props){

  //loginCheck = () => Alert.alert('Simple Button pressed')

  return(
    <View style={styles.container}>
      <TextInput placeholder = 'Usuario' placeholderTextColor='white' maxLength = {8}
      style = {[styles.styleInput, {marginTop: 10, width: 200}]}
      />
      <TextInput placeholder = 'Contraseña' placeholderTextColor='white' maxLength = {8}
      style = {[styles.styleInput, {marginTop: 20, width: 200}]}
      />
      <View style = {styles.styleBoton}>
      <Button title="Login"  onPress={
        auth().signInWithCredential()
      } style={{marginTop: 20}}/>

      </View>
    </View>
  )
  //this.loginCheck
}
const styles = StyleSheet.create({
  container : {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center'
  },
  styleBoton: {
    marginTop: 10
  },
  styleInput: {
    borderWidth: 1,
    color: 'white',
    borderColor: 'white',
    padding: 5
  }
})


export default body