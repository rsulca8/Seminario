import AsyncStorage from '@react-native-async-storage/async-storage';
const END_POINT = "http://192.168.100.14/cvrp/"

class API{
    //Método asíncrono
    static async checkLogin(user, password){
        var options = {method: "GET"}
        const query = await fetch(`${END_POINT}login_user.php?user=${user}&password=${password}`, options);
        const data = await query.json();
        return data;
    }

    static async createUser(nombre, apellido, email, user, password){
        console.log(`${END_POINT}create_user.php?user=${user}&password=${password}&email=${email}&nombre=${nombre}&apellido=${apellido}`)
        var options = {method: "GET"}
        const query = await fetch(`${END_POINT}create_user.php?user=${user}&password=${password}&email=${email}&nombre=${nombre}&apellido=${apellido}`, options)
        const data = await query.json() 
        console.log("data: " + JSON.stringify(data))
        return data     
    }
    
    static async createUser2(nombre, apellido, email, user, password){
        var url = `${END_POINT}create_user.php?user=${user}`;
        console.log(url)
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.send();
        request.onreadystatechange = () => {
            console.log("SE COMPLETÓ ")
            console.log(request.responseText)
        }
        return request.response
    }

    static async getUserInfo(user){
        var options = {method: "GET"}
        var url = `${END_POINT}user_info.php?user=${user}`;
        const query = await fetch(url, options);
        const data = await query.json();
        console.log("data: " + JSON.stringify(data));
        return data;
    }

    static getDatosUsuarioLocal = async () => {
        var user_data = await AsyncStorage.getItem("@user_data")
        return user_data;
    }

    static getProductos = async () => {
        var options = {method: "GET"}
        var url = `${END_POINT}get_productos.php`;
        const query = await fetch(url, options);
        const data = await query.json();
        //console.log(data)
        console.log("Se pidió pruductos")
        return data;
    } 

    static enviarPedido = async (encabezado, detalles) => {
        console.log(encabezado);
        let body = {
            ...encabezado,
            detalles: detalles
        };

        let options = {
            body: JSON.stringify(body),
            method: "POST",
            headers: {
               "Content-Type": "application/json"
              },
        };

        var url = `${END_POINT}enviar_pedido.php`;
        const query = await fetch(url, options);
        const respuesta = await query.text();
        console.log(respuesta);
        console.log("Se envió pruductos");
        return respuesta;
    }

}

export default API