<?php
	define('LOCALHOST','localhost');
    define('DB_USERNAME','root');
    define('DB_PASSWORD','');
    define('DB_NAME','example');
    //Execute query and create an database
    $conn = mysqli_connect(LOCALHOST, DB_USERNAME, DB_PASSWORD) or die(mysqli_error()); 
    //database connection
    $db_select = mysqli_select_db($conn,DB_NAME) or die(mysqli_error()); 
?>