const END_POINT = "localhost/"

class API{


    async getData(){
        console.log("nada")
    }

    //Método asíncrono
    async checkLogin(user, password){
        const query = await fetch(`${END_POINT}login.php?user=${user}&password=${password}`)
        const data = await query.json() 
        return data
    }
}

export default API