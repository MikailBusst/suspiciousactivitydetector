<?php
    header("Access-Control-Allow-Origin: *");
    
    include('database_connect.php');

    $ID = $_POST['id'];

    $sql = "SELECT user_first_name FROM users WHERE user_id = $ID;";

    $query = mysqli($connection, $sql);

    $row = mysqli_fetch_assoc($query);

    $FirstName = $row['user_first_name'];

    echo json_encode($FirstName);
?>