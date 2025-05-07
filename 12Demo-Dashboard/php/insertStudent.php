<?php
header("Content-Type: application/json");
include "connect.php";


// Get raw JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data["first"]) && isset($data["last"]) && isset($data["year_level"])) {
    $first = $conn->real_escape_string($data["first"]);
    $last = $conn->real_escape_string($data["last"]);
    $year_level = $conn->real_escape_string($data["year_level"]);

    $sql = "INSERT INTO students (first, last, year_level) VALUES ('$first', '$last', '$year_level')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Customer added successfully"]);
    } else {
        echo json_encode(["message" => "Error: " . $conn->error]);
    }
} else {
    echo json_encode(["message" => "Invalid input"]);
}

$conn->close();
?>

