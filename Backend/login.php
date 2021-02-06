<?php
    header("Access-Control-Allow-Origin: *");
    
    include('database_connect.php');

    $Email = $_POST['email'];
    $Password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE user_email ='$Email';";

    $query = mysqli_query($connection, $sql);

    if(mysqli_num_rows($query) > 0) {
        $row = mysqli_fetch_assoc($query);

        $RetrievedPassword = $row['user_password'];

        $PasswordVerification = password_verify($Password, $RetrievedPassword);

        if($PasswordVerification) {
            $ID = $row['user_id'];

            echo json_encode($ID);
        }
        else {
            $Status = "deniedpassword";

            echo json_encode($Status);
        }
    }
    else {
        $Status = "deniedemail";

        echo json_encode($Status);
    }
?>