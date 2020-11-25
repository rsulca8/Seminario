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


    function getCredential($conn, $user){
        $sql = 'SELECT usuario, password_cliente FROM Clientes WHERE usuario='.'"'.$user.'"';
        $resultado = $conn->query($sql);
        if(!$resultado){
            echo $conn->errno;
        }
        return $resultado->fetch_assoc();
    }

    function consultarUsuario($conn, $user){
        $sql = 'SELECT * FROM Clientes WHERE usuario='.'"'.$user.'"';
        $resultado = $conn->query($sql);
        if(!$resultado){
            echo $conn->errno;
        }
        return $resultado->fetch_assoc();
    }

    function insertarProducto($conn, $producto){
        $sql = sprintf('INSERT INTO Productos(
            nombre_producto, 
            descuento_producto,
            codigo_barra_producto,
            unidad_medida_id_producto,
            marca_producto,
            precio_producto) 
            VALUES (
            "%s", 
            %d, 
            %d, 
            "%s",
            "%s",
            %f
            )',
            $producto["nombre_producto"],
            $producto["descuento_producto"],
            $producto["codigo_barra_producto"],
            $producto["unidad_medida_id_producto"],
            $producto["marca_producto"],
            $producto["precio_producto"]
        );
        echo $sql;
        $resultado = $conn->query($sql);
        if(!$resultado){
            echo $conn->errno;
        }
    }

    function consultarProductos($conn){
        $sql = 'SELECT * FROM Productos';
        $resultado = $conn->query($sql);
        $productos = array();
        if(!$resultado){
            echo $conn->errno;
        }
        if ($resultado->num_rows > 0) {
            while($fila = $resultado->fetch_assoc()) {
                array_push($productos, $fila);
            }
            return $productos;
        }

    }

?>