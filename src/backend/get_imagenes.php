<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);


    function get_imagen($busqueda){
        $q = $busqueda;
        //$cantidad = $_GET["n"];
        $cantidad = 1;
        $query = sprintf("https://customsearch.googleapis.com/customsearch/v1?cx=5a2ee52442dd94efa&q=%s&searchType=image&key=AIzaSyBMMdGI1IrgQvEyzpb511dRfNlYeAhmb-w&num=%s",
            urlencode($q),
            $cantidad);
        $resultado = json_decode(file_get_contents($query));
        if($resultado->searchInformation->totalResults == 0){
            $imagen = "";
        }
        else{
            $items = $resultado->items;
            $links_imagenes = $items[0]->link;
            $imagen = base64_encode(file_get_contents($links_imagenes));
        }
        return ($imagen);
    }
    echo get_imagen($_GET["q"]);

?>