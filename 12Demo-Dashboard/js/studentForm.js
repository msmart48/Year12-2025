//add an event listener to the form and prevnet the default action of the form refreshing the page
document.getElementById("customerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    //get the values from the form and remove any whitespace
    let first = document.getElementById("first").value.trim();
    let last = document.getElementById("last").value.trim();
    let year_level = document.getElementById("year_level").value.trim();

    //validate the form data
    if (first === "" || last === "" || year_level === "") {
        alert("All fields are required!");
        return;
    }


    //create an object with the form data
    let formData = { first: first, last: last, year_level: year_level };
    console.log(formData);
    console.log(JSON.stringify(formData));
    //send the form data to the server
    fetch("php/insertStudent.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
        //get the response from the server
        .then(response => response.json())
        //do something with the response data that has been converted to a JavaScript object
        .then(data => {
            console.log(data.message);
            if (data.message == "Customer added successfully") {
                //clear the form
                document.getElementById("customerForm").reset();
                alert(data.message);
            }
        });


});
