import React, {useEffect, useState} from 'react'
//import { View , Text, StyleSheet, Image, Button} from 'react-native'
import AuthContext from "./AuthContext"
import { ImageBackground, StyleSheet, FlatList, TouchableHighlight, highlighted, View, ActivityIndicator} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Container, Header, Title, Fab, Content, Image,Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem, Card, CardItem, Thumbnail} from 'native-base';
import API from "./API"

const enviarIcono = require("../images/enviar.png");

function formatoFecha(fecha){
    let ret = "";
    ret += fecha.getFullYear() + "-";
    ret += fecha.getMonth() + "-";
    ret += fecha.getDate() + " ";
    ret += fecha.getHours() + ":";
    ret += fecha.getMinutes() + ":";
    ret += fecha.getSeconds();

    return ret;
}

//Obtiene el usuario loggeado
async function getUserData(){
    userData = await AsyncStorage.getItem("@authToken");
    userData = JSON.parse(userData);
    return userData;
}


Pedido = () => {

   

    const [pedido, setPedido] = useState([])
    const [listo, setListo] = useState(false)
    const [total, setTotal] = useState(0)
    const [userId, setUserId] = useState(0)
    
    async function enviar(){
        var userData = await getUserData();
        console.log("DATOS: " + JSON.stringify(userData))
        let fechaEnvio = new Date();
        fechaEnvio = formatoFecha(fechaEnvio);
        let encabezado = {
            id_cliente: userData.id,
            fecha_hora_pedido: fechaEnvio,
            total_pedido: total,
        }
        console.log("ENCABEZADO: " + JSON.stringify(encabezado));
        let detalles = []
        let listaPedido = Object.values(pedido);
        for(let i=0; i<listaPedido.length; i++){
            let p = {
                id_producto: listaPedido[i].id,
                producto_precio_venta: listaPedido[i].producto.precio_producto, 
                cantidad: listaPedido[i].cantidad
            };
            detalles.push(p);
        }
        API.enviarPedido( encabezado, detalles );
    }
    
    useEffect( () => {
        const getPedido = async () => {
            // var p = await AsyncStorage.removeItem("@pedido")
            var p = await AsyncStorage.getItem("@pedido")
            p = JSON.parse(p)
            console.log(Object.values(p))
            if(typeof(p) != "undefined"){
                p = Object.values(p);
                setPedido(p);
                let total = 0;
                for(let i=0; i<p.length; i++){
                    total += p[i].producto.precio_producto * p[i].cantidad;
                }
                setTotal(total);
                setListo(true);
            }else{
                setPedido([])
                setListo(true);
            }
        }
        getPedido()
    }, []);


    if(!listo){
        return(
            <View style={styles.container}>
                <ActivityIndicator
                    size="large"
                    animating={true}
                    style={{height: 100, marginTop: 10, opacity: 0.5 }}
                />
            </View>
        )
    }
    else{
        return(  
            <Container>
                <View style={styles.contenedorLista} >
                    <FlatList
                        data = {pedido}
                        keyExtractor = {(item) => String(item.id)}
                        renderItem={({ item, index, separators }) => (
                        <View style={styles.itemLista}>
                            <View style={styles.headerItem}>
                                <Thumbnail style={styles.imagenPruducto} large source={
                                    {uri: item.producto.imagen_producto}
                                } />
                                    <Text>{item.producto.nombre_producto}</Text>
                                    <Text note>{item.producto.marca_producto}</Text>
                            </View>
                            <View style={styles.precioCantidad}>
                                <Text>Precio: $ {item.producto.precio_producto}</Text>
                                <Text>Cantidad: {item.cantidad}</Text>
                            </View>       
                            <View style={styles.footerItem}>
                                <Text>Total producto ${(item.producto.precio_producto - item.producto.precio_producto*item.producto.descuento_producto)*item.cantidad}</Text>
                            </View>
                        </View>
                        )}
                        />
                </View>
                <View style={styles.totalPedido}>
                    <Text style={styles.textoTotalPedido}>Total: ${total}</Text>
                </View>
                <Fab
                direction="up"
                style={{ backgroundColor: '#f64040' }}
                position="bottomRight"
                onPress={() => enviar()}>
                <Thumbnail 
                small
                square
                source={
                    enviarIcono
                } />
            </Fab>
            </Container>
            
        )
    }

}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "white"
    },
    textHeader:{
        color: "white"
    },
    textoProducto:{
        color: "black",
        textAlign: "left",
        fontSize: 10
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
        flex: 3
    },
    footerLista: {
        flex: 1
    }
    ,
    itemLista:{
        flexDirection: "column",
        backgroundColor: "white",
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.50,
        shadowRadius: 9.65,
        elevation: 10,

    },
    
    contenedorLista:{
        backgroundColor: "white",
        flex: 1
    },
    sombra: {

    },
    precioCantidad:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginRight: "2%",
        marginBottom: "1%",
        marginTop: "2%"
    },
    totalPedido: {
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "black",
        height: "8%",
    },
    textoTotalPedido: {
        textAlignVertical: "center",
        fontWeight: "bold",
        fontSize: 25,
        color: "white",
    }
});
export default Pedido;