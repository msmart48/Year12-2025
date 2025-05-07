<?php
include "connect.php";  // Include your database connection file

header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"), true);
// Retrieve data from the database - always required
if(isset($data["request"])) {
    $request = $data["request"];
}else{
    echo json_encode(["message" => "No customers found"]);
    exit;
}

//api checks based on the request type and selects the relevent query
if($request == "all"){
    $sql = "SELECT * FROM students";
}else if($request == "year"){
    $sql = "SELECT * FROM students WHERE year_level = '12'";
//if search player is requested
}else if($request == "searchPlayer"){
    //check to see if value sent is set
    if(isset($data["search"])){
        $search = $data["search"];
        //query the database for the search value
        $sql = "SELECT * FROM students WHERE first LIKE '%$search%' OR last LIKE '%$search%'";
    }else{
        //if no value is set then return an error message
        echo json_encode(["message" => "Invalid request"]);
        exit;
    }
}else if($request == "allPlayersDrop"){
    $sql = "SELECT * FROM students order by last asc";
}else if($request =="getTotalNoms"){
    $sql = "SELECT count(nominations.activity_id) as count
    from nominations";
}else if($request == "getActivityCount"){
    $sql = "SELECT count(activities.activity_id) as count
    from activities";
}else if($request == "getStudentCount"){
    $sql = "SELECT count(students.student_id) as count
    from students";
}else if($request == "findStudentData"){
    //check to see if value sent is set
    if(isset($data["search"])){
        $search = $data["search"];
        //query the database for the search value
        $sql = "SELECT students.first,students.last,students.year_level,activities.name,nominations.year
        from nominations
        inner join students on nominations.student_id = students.student_id 
        inner join activities on nominations.activity_id = activities.activity_id 
        where students.first LIKE '%$search%' OR students.last LIKE '%$search%'";
    }else{
        //if no value is set then return an error message
        echo json_encode(["message" => "Invalid request"]);
        exit;
    }
}else if($request == "allNominations"){
    $sql = "select students.first,students.last,students.year_level,activities.name,nominations.year
     from nominations
     inner join students on nominations.student_id = students.student_id 
     inner join activities on nominations.activity_id = activities.activity_id";
}else if($request == "getYearLevelGraph"){
    $sql = "SELECT students.year_level,count(students.year_level) as count
    from nominations
    inner join students on nominations.student_id = students.student_id 
    inner join activities on nominations.activity_id = activities.activity_id 
    group by students.year_level
    order by students.year_level asc";
}else if($request == "getSportGraph"){
    $sql = "SELECT activities.name,count(nominations.activity_id) as count
    from nominations
    inner join students on nominations.student_id = students.student_id 
    inner join activities on nominations.activity_id = activities.activity_id
    group by activities.name";
}else if($request == "getFilteredData"){
    //check to see if value sent is set
    if(isset($data["yearLevel"])){        
        if($data["yearLevel"] != "all"){
            $year = intval($data["yearLevel"]);
            //query the database for the search value
            $sql = "SELECT activities.name,count(nominations.activity_id) as count
            from nominations
            inner join students on nominations.student_id = students.student_id
            inner join activities on nominations.activity_id = activities.activity_id
            where students.year_level = $year 
            group by activities.name order by activities.name asc";
        }else{
            //query the database for the search value
            $sql = "SELECT activities.name,count(nominations.activity_id) as count
            from nominations
            inner join students on nominations.student_id = students.student_id 
            inner join activities on nominations.activity_id = activities.activity_id 
            group by activities.name order by activities.name asc";
        }
    }else{
        //if no value is set then return an error message
        echo json_encode(["message" => "Invalid request"]);
        exit;
    }
}

else{
    echo json_encode(["message" => "Invalid request"]);
    exit;
}

//query the result from the database
$result = $conn->query($sql);

//check if there are results
//if so then return the results as json
//else return a message that no customers were found
if ($result->num_rows > 0) {
    $customers = [];
    while ($row = $result->fetch_assoc()) {
        $customers[] = $row;
    }
    echo json_encode($customers);
} else {
    echo json_encode(["message" => "No data found"]);
}
?>