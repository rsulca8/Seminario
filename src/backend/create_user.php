<?php 
    $params = $_GET;
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    require("connection.php");
    //localhost/?create_user=true&user=fulano&password=asdf&email=fulano@gmail.com&nombre=cosme&apellido=fulanito
    header('Content-Type: application/json');

    if (isset($params["user"])){
        $user = $params["user"];
        if (isset($params["password"])){
            $password = $params["password"];
        }
        $email = $params["email"];
        $nombre = $params["nombre"];
        $apellido = $params["apellido"];
        insertarUsuario($conn, $user, $password, $nombre, $apellido, $email);
    }
    else{
        echo json_encode("No se pudo concretar");
    }
?>