<?php
header("Content-Type: application/json");
include "connect.php";


// Get raw JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data["student_id"])) {
    $student_id = ($data["student_id"]);
    $activity_id = ($data["activity_id"]);
    $year = 2025;

    //this could be improved by using binding parameters
    $sql = "INSERT INTO nominations (student_id, activity_id, year) VALUES ($student_id, $activity_id, $year)";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Nomination added successfully"]);
    } else {
        echo json_encode(["message" => "Error: " . $conn->error]);
    }
} else {
    echo json_encode(["message" => "Invalid input"]);
}

$conn->close();
?>

