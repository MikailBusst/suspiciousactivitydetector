<?php
    header("Access-Control-Allow-Origin: *");
    
    include('database_connect.php');

    $UserID = 20;

    $sql = "SELECT user_status FROM users WHERE user_id = $UserID;";

    $query = mysqli_query($connection, $sql);

    $row = mysqli_fetch_assoc($query);

    $status = $row['user_status'];

    echo json_encode($status);
?>