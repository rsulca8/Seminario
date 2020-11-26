import React, {useEffect, useState} from 'react'
//import { View , Text, StyleSheet, Image, Button} from 'react-native'
import AuthContext from "./AuthContext"
import { ImageBackground, StyleSheet, FlatList, TouchableHighlight, highlighted, View} from 'react-native'

import { Container, Header, Title, Content, Image,Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem, Card, CardItem, Thumbnail} from 'native-base';
import API from "./API"
const fondo = require("../images/fondo.jpg");
const noImage = require("../images/noimage.png");


function añadirProductoPedido(){
    console.log("se agregó");
}

function Productos({navigation}){

    const [productos, setProductos] = useState([])

    useEffect(() => {
        const llamaProductos = async () => {
            var prods = await API.getProductos()
            setProductos(Object.values(prods))
        } 
        llamaProductos()
    }, []);
    
    return(
    <Container>
        <ImageBackground source={fondo} style={styles.container}>

        <Header>
            <Body>
                <Title >
                    <Text style={styles.textHeader}>
                    Productos
                    </Text>
                </Title>
            </Body>
        </Header>
        <View style={styles.contenedorLista} >
        <FlatList
            ItemSeparatorComponent={
                Platform.OS !== 'android' && (({ highlighted }) => (
                <View
                    style={[
                    style.separator,
                    highlighted && { marginLeft: 0 }
                    ]}
                />
                ))
            }
            data={productos}
            renderItem={({ item, index, separators }) => (
                <TouchableHighlight
                keyExtractor={item.id_producto}
                onPress={() => console.log("se presionó un producto")}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}>
                                    <Card>
                                        <CardItem>
                                        <Left>
                                            <Thumbnail source={
                                                {uri: `data:image/jpeg;base64,${item.imagen_producto}`}
                                            } />
                                            <Body>
                                                <Text>{item.nombre_producto}</Text>
                                                <Text note>{item.marca_producto}</Text>
                                            </Body>
                                        </Left>
                                        </CardItem>
                                        <CardItem>
                                        <Left>
                                            <Button transparent>
                                            <Icon active name="thumbs-up" />
                                            <Text>${item.precio_producto}</Text>
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Button transparent>
                                            <Icon active name="chatbubbles" />
                                            <Text>Descuento: {item.descuento_producto}</Text>
                                            </Button>
                                        </Body>
                                        <Right>
                                            <Button onPress={()=>{añadirProductoPedido()}}>
                                                <Text>Añadir a pedido</Text>
                                            </Button>
                                        </Right>
                                        </CardItem>
                                    </Card>
                </TouchableHighlight>
            )}
            />
        </View>
        </ImageBackground>
    </Container>);
}


const styles = StyleSheet.create({
    container : {
        flex: 2,
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    fotoPerfil:{
        flex: 1,
        alignItems: 'center',
    },
    header:{
        backgroundColor: "black"
    },
    textHeader:{
        color: "white"
    },
    textoProducto:{
        color: "black",
        textAlign: "left",
        fontSize: 10
    },
    lista:{
        flex: 1
    },
    contenedorLista:{
        backgroundColor: "white",
        width: '100%',
        height: '100%',
        flex: 1
    }
});
export default Productos