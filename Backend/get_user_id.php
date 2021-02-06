<?php
    header("Access-Control-Allow-Origin: *");
    
    include('database_connect.php');

    $ID = $_SESSION['id'];

    echo json_encode($ID);
?>