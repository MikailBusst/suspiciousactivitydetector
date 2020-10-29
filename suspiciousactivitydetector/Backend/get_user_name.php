<?php
    header("Access-Control-Allow-Origin: *");
    
    include('database_connect.php');

    $ID = $_POST['id'];

    $sql = "SELECT * FROM users WHERE user_id = $ID;";

    $query = mysqli_query($connection, $sql);

    $row = mysqli_fetch_assoc($query);

    $FirstName = $row['user_first_name'];
    $LastName = $row['user_last_name'];

    $array['FirstName'] = $FirstName;
    $array['LastName'] = $LastName;

    echo json_encode($array);
?>