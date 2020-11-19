<?php
    $conn = new mysqli('localhost', 'rsulca8', 'cafayate', 'cvrp_app');

    function insertarUsuario($conn, $user, $pass, $nombre, $apellido, $email){
        $fields = "(nombre_cliente, apellido_cliente, usuario, email_cliente, password_cliente, razon_social_cliente)";
        $sql = 'INSERT INTO Clientes'.$fields .' VALUES ("'. $nombre . '","' . $apellido . '","'. $user . '","' . $email ;
        $sql = $sql . '","' . $pass . '", "razón social")'; 
        $resultado = $conn->query($sql);
        if(!$resultado){
            echo $conn->errno;
        }
        else{
            header('Content-Type: application/json');
            echo json_encode("OK");
        }
    };

    function consultarUsuario($conn, $user){
        $sql = 'SELECT * FROM Clientes WHERE usuario='.'"'.$user.'"';
        $resultado = $conn->query($sql);
        if(!$resultado){
            echo $conn->errno;
        }
        return $resultado->fetch_assoc();
    }

?>