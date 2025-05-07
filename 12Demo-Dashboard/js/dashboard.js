const yearLevelChart = document.getElementById('yearLevelChart');
const sportChartOutput = document.getElementById('sportChart');
const filterChartOutput = document.getElementById('filteredChart');

var ylChart
var sportChart
var filterChart

//buildYLChart();
getYearLevelData();
getSportData();
//getTotalNoms();
getValues("getTotalNoms", "totalNominations");
getValues("getStudentCount", "totalStudents");
getValues("getActivityCount", "totalActivities");

function buildYLChart(labels, count) {
    //check to see if the chart already exists and destroy it if it does destroy it
    if (ylChart) {
        ylChart.destroy();
    }
    //load new chart with data from function
    ylChart = new Chart(yearLevelChart, {
        type: 'bar',
        data: {
            labels: labels, //array of labels from function
            datasets: [{
                label: 'Year Level nominations',
                data: count,    //array of data from from function
                borderWidth: 1,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1,
                        color: 'black' // Set the color of the y-axis labels to white
                    }
                }
            }
        }
    });
}

function buildSportChart(labels, count) {
    //check to see if the chart already exists and destroy it if it does destroy it
    if (sportChart) {
        sportChart.destroy();
    }
    //load new chart with data from function
    sportChart = new Chart(sportChartOutput, {
        type: 'bar',
        data: {
            labels: labels, //array of labels from function
            datasets: [{
                label: 'Sport Nominations',
                data: count,    //array of data from from function
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function buildFilterChart(labels, count) {
    //check to see if the chart already exists and destroy it if it does destroy it
    if (filterChart) {
        filterChart.destroy();
    }
    //load new chart with data from function
    filterChart = new Chart(filterChartOutput, {
        type: 'pie',
        data: {
            labels: labels, //array of labels from function
            datasets: [{
                label: 'Sport Nominations',
                data: count,    //array of data from from function
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}



function getYearLevelData() {
    console.log('getting yearLevelData');

    fetch("php/api.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        //send the search input to the server with specific request
        body: JSON.stringify({ request: "getYearLevelGraph" })  // Send a request to get all data
    })
        .then(response => response.json())
        .then(data => {
            let labels = [];
            let counts = [];
            //loop through the data and push the year level and count to the labels and counts array
            for (var i = 0; i < data.length; i++) {
                labels.push(data[i].year_level);
                counts.push(parseInt(data[i].count))
            }
            buildYLChart(labels, counts)
        })
        .catch(error => console.error('Error:', error));
}

function getSportData() {
    console.log('getting Sport Data');

    fetch("php/api.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        //send the search input to the server with specific request
        body: JSON.stringify({ request: "getSportGraph" })  // Send a request to get all data
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let labels = [];
            let counts = [];
            //loop through the data and push the year level and count to the labels and counts array
            for (var i = 0; i < data.length; i++) {
                labels.push(data[i].name);
                counts.push(parseInt(data[i].count))
            }
            buildSportChart(labels, counts)
        })
        .catch(error => console.error('Error:', error));
}

function filterData() {
    console.log('getting filtered data');
    //get the selected year level and sport from the dropdowns
    const yearLevel = document.getElementById('yearLevel').value;
    console.log(yearLevel)

    fetch("php/api.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        //send the search input to the server with specific request
        body: JSON.stringify({ request: "getFilteredData", yearLevel: yearLevel })  // Send a request to get all data
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let labels = [];
            let counts = [];
            //loop through the data and push the year level and count to the labels and counts array
            for (var i = 0; i < data.length; i++) {
                labels.push(data[i].name);
                counts.push(parseInt(data[i].count))
            }
            buildFilterChart(labels, counts)
        })
        .catch(error => console.error('Error:', error));
}



//This function gets a request and output to be reused across multiple get values
function getValues(request, output) {
    console.log('getting total nominations');
    fetch("php/api.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        //send the search input to the server with specific request
        body: JSON.stringify({ request: request })  // Send a request to get all data
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            document.getElementById(output).innerText = data[0].count
        })
        .catch(error => console.error('Error:', error));

}

function searchStudent() {
    document.getElementById("searchResults").innerHTML = ""; //clear the search results
    console.log('getting student data');
    var search = document.getElementById('search').value;
    if (search != "") {

        fetch("php/api.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            //send the search input to the server with specific request
            body: JSON.stringify({ request: "findStudentData", search: search })  // Send a request to get all data
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                var text = `<table class="table is-bordered"><tr><th>Name</th><th>Season</th><th>Sport</th></tr>`; //clear the search results
                for (var i = 0; i < data.length; i++) {
                    text += `<tr><td>${data[i].first} ${data[i].last}</td><td>${data[i].year}</td><td>${data[i].name}</td></tr>`

                }
                text += `</table>`;
                document.getElementById("searchResults").innerHTML = text; //set the search results to the text variable

            })
            .catch(error => console.error('Error:', error));
    } else {
        document.getElementById("searchResults").innerHTML = "Please enter a name"; //clear the search results
    }

}