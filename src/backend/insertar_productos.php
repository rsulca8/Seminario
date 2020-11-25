<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    require("connection.php");


    function getRubroId($rubros, $buscado){
        $i = 0;
        $flag = true;
        while( $i<count($rubros) && $flag){
            if($rubros[$i]["nombre_rubro"] == $buscado){
                $flag = false;
            }
            $i++;
        }
        return $i--;
    }



    function insertarProductos($conn){
        $rubros = getRubros($conn);
        $fila = 1;
        $gestor = fopen("productos.csv", "r");
    
        if ($gestor !== FALSE) {
            $datos = fgetcsv($gestor, 1000, ",");
            //while($datos !== FALSE){
            for($i=0; $i<141; $i++){
                $datos = fgetcsv($gestor, 1000, ","); 
                $producto = array(
                    "nombre_producto" => $datos[1], 
                    "descuento_producto" => 0,
                    "codigo_barra_producto" => 0000000000000,
                    "unidad_medida_id_producto" => "litros",
                    "marca_producto" => $datos[3],
                    "precio_producto" => $datos[5],
                    "stock" => 0,
                    "rubro_id" => getRubroId($rubros, $datos[2]),
                );
                //print_r($rubros);
                insertarProducto($conn, $producto);
                echo "<p>Fila: $i: <br /></p>\n";
                print_r($producto);
            }
    
            fclose($gestor);
        }
    }



    function insertarRubros($conn){
        $fila = 1;
        $gestor = fopen("productos.csv", "r");

        $rubros = array();
        
        if ($gestor !== FALSE) {
            $datos = fgetcsv($gestor, 1000, ",");
            while($datos !== FALSE && $fila<141){
                $datos = fgetcsv($gestor, 1000, ",");
                $fila++;
                array_push($rubros, $datos[2]);
            }
            $rubros = array_values(array_unique($rubros));
            echo count($rubros)."</br>";
            print_r($rubros);
            for($i=0; $i<count($rubros); $i++){
                echo $rubros[$i]."</br>";
                insertarRubro($conn, $rubros[$i]);
            }
            fclose($gestor);
        }
    }
    //insertarRubros($conn);
    insertarProductos($conn);
?>
