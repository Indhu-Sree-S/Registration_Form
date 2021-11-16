<?php

	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
  
	include("config.php");
	$input  = file_get_contents('php://input');
	$data = json_decode($input,true);
	$message = array();
	$Fullname = $data['Fullname'];
	$Email_id = $data['Email_id'];
	$Phone_number = $data['Phone_number'];
	$Profession = $data['Profession'];
	$City = $data['City'];
	
	$q = mysqli_query($conn, 
	"INSERT INTO Registration_Details (Fullname,Email_id,Phone_number,Profession,City) 
	VALUES('$Fullname','$Email_id','$Phone_number','$Profession','$City')"
	);
	
	if($q)
	{
	    http_response_code(201);
	    $message['status'] = true;
	}
	else
	{
	    http_response_code(422);
	    $message['status'] = false;
	    $message['error'] = 'DB Error';
	}
	
	echo json_encode($message);
?>