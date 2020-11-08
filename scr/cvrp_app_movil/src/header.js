import React from 'react'
import { View , Text, StyleSheet, Image, Button} from 'react-native'

// Declaracion de funcion AppLayout
function header(props){
    return(
      <View style={styles.container}>
        <View style={styles.headerLeft}>
            <Image source={require('../assets/favicon.png')} 
            style={styles.logo}></Image>
        </View>

        <Text style={ {color: 'white'} } > Aqui iría un nombre picante </Text>

      </View>
    )
}

const styles = StyleSheet.create({
  container : {
    flex: 0.5,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo : {
    width : 100,
    height : 60,
    resizeMode : 'contain',
    borderRadius : 30
  }
})


export default header