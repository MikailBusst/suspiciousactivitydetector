<?php 
    header("Access-Control-Allow-Origin: *");
    
    include('database_connect.php');

    $FirstName = $_POST['firstname'];
    $LastName = $_POST['lastname'];
    $Email = $_POST['email'];
    $UserPassword = $_POST['password'];
    $Status = $_POST['status'];

    if(is_null($Status)) {
        $Status = 0;
    }

    $sql = "SELECT * FROM users WHERE user_email = '$Email';";

    $query = mysqli_query($connection, $sql);

    if(mysqli_num_rows($query) > 0) {
        $res = "emailexists";

        echo json_encode($res);
    }
    else {
        $Date = date("Y-m-d");

        $UserPassword = password_hash($UserPassword, PASSWORD_DEFAULT);

        $sql = "INSERT INTO users (user_first_name, user_last_name, user_email, user_password, user_status, user_date) VALUES ('$FirstName', '$LastName', '$Email', '$UserPassword', $Status, '$Date');";
        
        mysqli_query($connection, $sql);

        $sql = "SELECT user_id from users WHERE user_email='$Email';";
        
        $query = mysqli_query($connection, $sql);

        $row = mysqli_fetch_assoc($query);

        $res = $row['user_id'];

        echo json_encode($res);
    }
?>