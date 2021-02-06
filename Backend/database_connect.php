<?php
    session_start();

    $host = "localhost";
    $user = "root";
    $password = "";
    $database = "SuspiciousActivityDetector";

    $connection = mysqli_connect($host, $user, $password, $database);
?>