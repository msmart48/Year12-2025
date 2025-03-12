<?php include "templates/header.php"; ?>
<div class="container">   
<h2 class="title">Add Student Form</h2>
    <form id="customerForm">
        <label for="first">First Name:</label>
        <input type="text" id="first" name="first" required><br><br>

        <label for="last">Last Name:</label>
        <input type="text" id="last" name="last" required><br><br>

        <label for="year_level">Year Level:</label>
        <input type="text" id="year_level" name="year_level"
            required><br><br>

        <button class="button is-primary" type="submit">Submit</button>
    </form>
</div> 

<script src="js/studentForm.js"></script>

</body>
</html>