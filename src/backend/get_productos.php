<?php
    require("connection.php");
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    $productos = consultarProductos($conn);
    http_response_code(200);
    echo json_encode($productos);
?>