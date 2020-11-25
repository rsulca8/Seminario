<?php
    require("connection.php");
    $params = $_GET;
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    
    header('Content-Type: application/json');

    
    if (isset($params["user"])){
        $resultado = consultarUsuario($conn, $params["user"]);
        http_response_code(200);
        echo json_encode(array(
                "usuario" => $resultado["usuario"],
                "nombre" => $resultado["nombre_cliente"],
                "apellido" => $resultado["apellido_cliente"],
                "razon_social" => $resultado["razon_social_cliente"]
            )   
        );
    }
    else{
        http_response_code(400);
        echo json_encode(array("resp"=>"Petición incorrecta"));
    }

?>