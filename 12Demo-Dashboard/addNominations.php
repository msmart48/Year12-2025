<?php include "templates/header.php"; ?>
<div class="container">   
<h2 class="title">Nomination Form</h2>
    <form id="addNomsForm">
        <label for="student">Student</label>
        <select name="student" id="student_id"></select>
        

        <label for="sport">Activity</label>
        <select name="sport" id="activity_id">
            <option value=1>Soccer</option>
            <option value=2>Football</option> 
            <option value=3>Choir</option>
            <option value=4>Tennis</option>
        </select>
        <button class="button is-primary" type="submit">Submit</button>
    </form>
    <hr>
    <table class="table is-bordered" id="dataOutput">
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Year Level</th>
                <th>Activity</th>
                <th>Year</th>
            </tr>
        </table>
</div> 

<script src="js/addNoms.js"></script>

</body>
</html>
