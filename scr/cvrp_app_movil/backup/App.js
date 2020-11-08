import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, Button, Alert, ImageBackground, TouchableOpacity, TextInput, ScrollView}
from 'react-native'
import Header from './src/header'
import Body from './src/body'

class HolaCiapfa extends Component {
  render(){
    return(
      <ImageBackground source = {require('./images/fondo.jpg')} style={styles.container}>
        
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

export default HolaCiapfa