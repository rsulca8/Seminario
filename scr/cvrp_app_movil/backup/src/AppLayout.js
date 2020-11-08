import React from 'react'
import { View , Text, StyleSheet} from 'react-native'
import auth from '@react-native-firebase/auth';


// Declaracion de funcion AppLayout
function AppLayout(props){
    return(
        <View style = {styles.container}>
            <Text> {props.saludo} Usuario: {props.user} Pass: {props.pass}  </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default AppLayout