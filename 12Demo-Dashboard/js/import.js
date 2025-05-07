document.getElementById("csvForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    let fileInput = document.getElementById("csvFile");
    let file = fileInput.files[0]; // Get the uploaded file

    if (file && file.type === "text/csv") {
        let formData = new FormData();
        formData.append("csvFile", file); // Append the file to FormData
        console.log(formData);

        // Send the raw CSV file to the server
        fetch("php/upload.php", {
            method: "POST",
            body: formData // Send as FormData
        })
            .then(response => response.json())
            .then(data => console.log(data)) // Log success or error message
            .catch(error => console.error("Error:", error));
    } else {
        alert("Please upload a valid CSV file.");
    }
});