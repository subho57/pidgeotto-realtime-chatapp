<?php
$host = "localhost";
$user = "root";
$password = "";
$database = "pidgeotto";
$port = 3306;

$conn = mysqli_connect($host, $user, $password, $database, $port);
if (!$conn) {
  echo "Database connection error: " . mysqli_connect_error() . ". ";
}
