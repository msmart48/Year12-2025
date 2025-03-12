const dataOutput = document.getElementById('dataOutput');


if (window.location.search) {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    getData(type);
} else {
    getData('all');
}

function getData(type) {
    fetch("php/api.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ request: type })  // Send a request to get all data
    })
        //convert the response to json
        .then(response => response.json())
        //then do something with the data
        .then(data => {
            console.log(data);
            //check if there is a message
            if (data.message) {
                dataOutput.innerHTML = '<tr><td colspan="3">' + data.message + '</td></tr>';
                return;
                //if there is no message, print the data
            } else {
                printList(data);
            }
        })
        //catch any errors and log them to the console
        .catch(error => console.error('Error:', error));
}

//this function is called when the search button is clicked - it sends a fetch request to the server api and returns the data to the printList function
function searchPlayers() {
    console.log('searchPlayers');
    const searchInput = document.getElementById('search').value;
    console.log(searchInput);
    fetch("php/api.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        //send the search input to the server with specific request
        body: JSON.stringify({ request: "searchPlayer", search: searchInput })  // Send a request to get all data
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.message) {
                dataOutput.innerHTML = '<tr><td colspan="3">' + data.message + '</td></tr>';
                return;
            } else {
                printList(data);
            }
        })
        .catch(error => console.error('Error:', error));
}


//this function prints out a list of students by passing in an array of data
function printList(data) {
    // Clear the table rows accept header
    dataOutput.innerHTML = '<tr><th>First Name</th><th>Last Name</th><th>Year Level</th></tr>';
    // Loop through the data and print each row into table
    data.forEach(row => {
        dataOutput.innerHTML += '<tr><td>' + row.first + '</td><td>' + row.last + '</td><td>' + row.year_level + '</td></tr>';
    });


}
