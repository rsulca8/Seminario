import React, {useEffect, useState} from 'react'
//import { View , Text, StyleSheet, Image, Button} from 'react-native'
import AuthContext from "./AuthContext"
import { ImageBackground, StyleSheet, FlatList, TouchableHighlight, highlighted, View} from 'react-native'

import { Container, Header, Title, Content, Image,Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem, Card, CardItem, Thumbnail} from 'native-base';
import API from "./API"

prueba = () => {

    const [productos, setProductos] = useState([])

    useEffect(() => {
        const llamaProductos = async () => {
            var prods = await API.getProductos()
            setProductos(Object.values(prods))
        }
        llamaProductos()
        for(let i=0; i<productos.length; i++){
            console.log(productos[i].imagen_producto+", ")
        }
    }, []);
    

    return(
        <Content>
            <Text>{productos[0].nombre_producto}</Text>
            { <Thumbnail source={
                {uri: `data:image/jpeg;base64,${productos[0].imagen_producto}`}
            }>
            </Thumbnail> }


        </Content>
    );
}
export default prueba;