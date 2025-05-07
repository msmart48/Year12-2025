<?php
header("Content-Type: application/json");
include "connect.php";  // Include your database connection file

// Check if a file is uploaded
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_FILES["csvFile"])) {
    $file = $_FILES["csvFile"];

    // Check for upload errors
    if ($file["error"] !== UPLOAD_ERR_OK) {
        echo json_encode(["message" => "File upload error"]);
        exit;
    }

    // Read the CSV file contents
    $csvData = file_get_contents($file["tmp_name"]);
    $lines = explode("\n", $csvData);
    $parsedData = [];

    foreach ($lines as $line) {
        $row = str_getcsv($line); // Convert CSV row into an array

        // Ensure the row has at least 3 columns before inserting
        if (count($row) >= 3) {
            $parsedData[] = $row;
        }
    }

    // Insert into the database
    $stmt = $conn->prepare("INSERT INTO students (first, last, year_level) VALUES (?, ?, ?)");

    //loop through each row from the CSV
    foreach ($parsedData as $row) {
        $first = $row[0];
        $last = $row[1];
        $year_level = $row[2];

        // Bind the parameters to sql statement
        $stmt->bind_param("sss", $first, $last, $year_level);
        if (!$stmt->execute()) {
            echo json_encode(["message" => "Error inserting data: " . $stmt->error]);
            $stmt->close();
            $conn->close();
            exit;
        }
    }

    $stmt->close();
    echo json_encode(["message" => "CSV data successfully uploaded and inserted"]);
} else {
    echo json_encode(["message" => "No file uploaded"]);
}

$conn->close();
?>
