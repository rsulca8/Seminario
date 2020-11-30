import React, {useEffect, useState} from 'react'
//import { View , Text, StyleSheet, Image, Button} from 'react-native'
import AuthContext from "./AuthContext"
import { ImageBackground, ActivityIndicator, StyleSheet, FlatList, TouchableHighlight, highlighted, View} from 'react-native'

import { Container, Header, Title, Fab, Content, Image,Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem, Card, CardItem, Thumbnail} from 'native-base';
import API from "./API"
import { FloatingAction } from "react-native-floating-action"; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const fondo = require("../images/fondo.jpg");
const noImage = require("../images/noimage.png");
const chanquito = require("../images/carrito.png");
const agregar = require("../images/agregar.png");
const quitar = require("../images/quitar.png");







function getURIFormatoImagen(base64Img){
    switch (base64Img.charAt(0)){
        case '/':
            return `data:image/jpeg;base64,${base64Img}`;    
        case 'i':
            return `data:image/png;base64,${base64Img}`;
        case 'R':
            return `data:image/png;base64,${base64Img}`;
        case 'U':
            return `data:image/png;base64,${base64Img}`;
    }
}

function Productos({navigation}){


    function productoItem(item){
        return(
        <View style={styles.itemLista}>
            <View style={styles.headerItem}>
                <Thumbnail style={styles.imagenPruducto} large source={
                    {uri: item.imagen_producto}
                } />
                    <Text>{item.nombre_producto}</Text>
                    <Text note>{item.marca_producto}</Text>
            </View>
            <View style={styles.footerItem}>
                <Text style={styles.textoProducto}>${item.precio_producto}</Text>
                <Text style={styles.textoProducto}>Descuento: {item.descuento_producto}</Text>
                <Button 
                transparent
                onPress={()=>{console.log("Se presionó añadir");añadirProductoPedido(item)}}>
                    <Thumbnail  small square 
                    source={agregar}>
                    </Thumbnail>
                </Button>
    
                <Button 
                transparent
                onPress={()=>{console.log("Se presionó añadir");quitarProducto(item)}}>
                    <Thumbnail  small square 
                    source={quitar}>
                    </Thumbnail>
                </Button>
            </View>       
        </View>);
    }

    function getCantidad(p){
        return p.length
    }

    const getTotal = (p) => {
        p = Object.values(p);
        let total = 0;
        for(let i=0; i<p.length; i++){
            total += p[i].producto.precio_producto * p[i].cantidad;
        }
        return total
    }
    
    const añadirProductoPedido = async (producto) => {
        var pedido = await AsyncStorage.getItem("@pedido");
        pedido = JSON.parse(pedido);
    
        if(pedido == null){
            var pedido = {}
            pedido[producto.id_producto] = {
                id: producto.id_producto,
                producto: producto,
                cantidad: 1,
            }
            await AsyncStorage.setItem("@pedido", JSON.stringify(pedido));
            setTotal(getTotal(pedido));
            console.log(pedido);
        }else{
            try{
                console.log(pedido);
                pedido[producto.id_producto].cantidad++;
            }
            catch{
                pedido[producto.id_producto] = {
                    id: producto.id_producto,
                    producto: producto,
                    cantidad: 1,
                }
                console.log(pedido);
            }
            setTotal(getTotal(pedido));
            await AsyncStorage.setItem("@pedido", JSON.stringify(pedido));
        }
        setCantidad(Object.values(pedido).length);
        console.log(cantidad)
    }

    async function quitarProducto(producto){
        var pedido = await AsyncStorage.getItem("@pedido");
        pedido = JSON.parse(pedido);
    
        if(pedido != null){
            try{
                console.log(pedido);
                pedido[producto.id_producto].cantidad--;
                if(pedido[producto.id_producto].cantidad == 0){
                    delete pedido[producto.id_producto]
                }
                setCantidad(Object.values(pedido).length);
            }
            catch{
                console.log("el producto no está en el pedido");
            }
            setTotal(getTotal(pedido));
            await AsyncStorage.setItem("@pedido", JSON.stringify(pedido));
        }
    }
     
    const [productos, setProductos] = useState([]);
    const [estaCargando, setEstaCargando] = useState(true);
    const [total, setTotal] = useState(0);
    const [pedido, setPedido] = useState(0);
    const [cantidad, setCantidad] = useState(0);
    useEffect(() => {
        const llamaProductos = async () => {
            var prods = await API.getProductos();
            setProductos(Object.values(prods));
            setEstaCargando(false);
            setCantidad(Object.values(pedido).length);
        }
        let p = llamaProductos();
    }, []);

    if(estaCargando){
        return(
            <View style={styles.container}>
                <ActivityIndicator
                    size="large"
                    color="black"
                    animating={true}
                    style={{height: 100, marginTop: 10, opacity: 0.5 }}
                />
            </View>
        )
    }
    else{
        return(
        <Container>
            <View style={styles.header}>
                <Text style={styles.textHeader}>
                    Total: ${Math.round(total*100)/100}
                </Text>
                <Text style={styles.textHeader}>
                    Cantidad de Items: {cantidad}
                </Text>
            </View>
            <View style={styles.contenedorLista} >
            <FlatList
                data={productos}
                keyExtractor={(item, index) => String(item.id_producto)}
                initialNumToRender={7}
                renderItem={({ item, index, separators }) => (
                    productoItem(item)
                )}
                />
            </View>
            <Fab
                direction="up"
                style={{ backgroundColor: '#f64040' }}
                position="bottomRight"
                onPress={() => navigation.navigate("Pedido")}>
                <Thumbnail 
                small
                square
                source={
                    chanquito
                } />
            </Fab>
        </Container>);
    }

}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "white"
    },
    fotoPerfil:{
        flex: 1,
        alignItems: 'center',
    },
    header:{
        backgroundColor: "black",
        height: "6%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    textHeader:{
        marginTop: "1%",
        marginRight: "2%",
        marginLeft: "2%",
        color: "white",
        textAlignVertical: "center"
    },
    textoProducto:{
        color: "black",
        textAlign: "left",
        fontSize: 17,
        marginLeft: "1%",
        textAlignVertical: "center"
    },
    headerItem:{
        flex: 3,
        alignItems: "center"
    },
    imagenPruducto:{
        borderColor: "black",
        borderRadius: 90,
        borderWidth: 2,
        marginTop: "4%"
    },
    footerItem:{
        borderColor: "gray",
        flexDirection: "row",
        flex: 3,
        marginTop: "5%",
        marginBottom: "2%",
        justifyContent: "space-between",
    },
    itemLista:{
        flexDirection: "column",
        backgroundColor: "white",
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.50,
        shadowRadius: 4.65,
        elevation: 8,
    },
    contenedorLista:{
        backgroundColor: "white",
        width: '100%',
        height: '100%',
        flex: 1,
        borderColor: "black",
        borderBottomWidth: 3
    },
    botonAñadir:{
        backgroundColor: "white",
    },

    FAB: {
        backgroundColor: "white"
    }
});

export default Productos