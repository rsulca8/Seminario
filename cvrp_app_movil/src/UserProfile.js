import React, {useEffect} from 'react'
import { ImageBackground, StyleSheet, View} from 'react-native'
import AuthContext from "./AuthContext"
import { Container, Header, Title, 
    Content, Footer, FooterTab, Button,
     Left, Right, Body, Icon, Text, Thumbnail  } from 'native-base';
import API from "./API"
const fondo = require("../images/fondo.jpg");
const perfil = require("../images/profile.png");


function UserProfile({navigation}){
    const { signOut } = React.useContext(AuthContext);
    //const user_data = await AsyncStorage.getItem("@user_data")
    const salir = () => {
        signOut()
        navigation.navigate('Login')
    }

    useEffect(() => {
        const user_data = API.getDatosUsuarioLocal()
    }, []);


    return(
        <Container>
            <ImageBackground source={fondo} style={styles.container}>
                    <Content>
                        <View style={styles.perfil}>
                            <Thumbnail large source={perfil} style={styles.fotoPerfil}/>
                            <Text style={styles.textProfile}>
                                {user_data.nombre + " " + user_data.apellido}
                            </Text>
                        </View>
                    <View style={styles.containerDatosUsuario}>
                        <Text style={styles.textDatosUsuario}>
                            Razón Social: {user_data.razon_social}
                        </Text>
                    </View>
                    </Content>
                    <Footer>
                    <FooterTab>
                        <Button >
                            <Text>Perfil</Text>
                        </Button>
                        <Button >
                            <Text>Productos</Text>
                        </Button>
                        <Button onPress={()=>salir()}>
                            <Text>Salir</Text>
                        </Button>
                    </FooterTab>
                    </Footer>
            </ImageBackground>
        </Container>
    )
}

const styles = StyleSheet.create({
    container : {
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    fotoPerfil:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: "white"
    },
    textProfile:{
        color: "white",
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 35
    },
    textDatosUsuario:{
        color: "white",
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 18
    },
    perfil: {
        flex: 3,
        alignItems: 'center',
        marginTop: '20%'
    },
    containerDatosUsuario:{
        marginTop: '10%'
    }
});
export default UserProfile