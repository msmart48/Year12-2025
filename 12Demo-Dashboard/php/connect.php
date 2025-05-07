<?php
// Database connection
$host = "localhost";
$username = "root";
$password = "";
$dbname = "nomsdemo";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["message" => "Database connection failed"]));
}
?>