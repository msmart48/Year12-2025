getPlayers();
getNominations();

document.getElementById('addNomsForm').addEventListener('submit', function () {
    event.preventDefault();
    let student_id = document.getElementById('student_id').value.trim();
    let activity_id = document.getElementById('activity_id').value.trim()

    let form = {
        student_id: parseInt(student_id),
        activity_id: parseInt(activity_id)
    };
    console.log(form);
    fetch("php/insertNomination.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(form)  // Send a request to get all data
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            getNominations();
            if (data.message) {
                //dataOutput.innerHTML = '<tr><td colspan="3">' + data.message + '</td></tr>';
                return;
            }
            alert("Nomination added successfully!");

            document.getElementById('addNomsForm').reset
        })
        .catch(error => console.error('Error:', error));
});

function getPlayers() {

    fetch("php/api.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ request: "allPlayersDrop" })  // Send a request to get all data
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.message) {
                //dataOutput.innerHTML = '<tr><td colspan="3">' + data.message + '</td></tr>';
                return;
            } else {
                //create values for the dropdown
                let select = document.getElementById('student_id');
                for (let i = 0; i < data.length; i++) {
                    let option = document.createElement('option');
                    option.value = data[i].student_id;
                    option.text = `${data[i].first} ${data[i].last} - (${data[i].year_level})`;
                    select.appendChild(option);
                }
            }
        })
        .catch(error => console.error('Error:', error));
}

//this function is called when the search button is clicked - it sends a fetch request to the server api and returns the data to the printList function
function getNominations() {
    fetch("php/api.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        //send the search input to the server with specific request
        body: JSON.stringify({ request: "allNominations" })  // Send a request to get all data
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
    console.log(data);
    // Clear the table rows accept header
    dataOutput.innerHTML = `<tr>
        <th> First Name</th>
                <th>Last Name</th>
                <th>Year Level</th>
                <th>Activity</th>
                <th>Year</th>
            </tr> `;
    // Loop through the data and print each row into table
    data.forEach(row => {
        dataOutput.innerHTML += `<tr><td> ${row.first}</td><td>${row.last}</td><td>${row.year_level}</td><td>${row.name}</td><td>${row.year}</td></tr>`;
    });


}