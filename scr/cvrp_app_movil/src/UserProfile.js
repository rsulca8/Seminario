import React from 'react'
import { View , Text, StyleSheet, Image, Button} from 'react-native'



function UserProfile({navigation}){
    return(
        <View>
            <Text>Nombre: </Text>
            <Text>Razón Social: </Text>
            <Button
            onPress={() => navigation.navigate('SignInScreen')}>
                Salir
            </Button>
        </View>
    )
}

export default  UserProfile