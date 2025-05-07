<?php include "templates/header.php"; ?>
    <div class="container">
    <h1 class="title">Import Data from CSV</h1>
        <form id="csvForm" enctype="multipart/form-data">
            <label>Select CSV File:</label>
            <input type ="file" id="csvFile" accept=".csv" name="csvfile"/>
            </br>
            <input class="button is-primary" type="submit" name="submit" value="Import"/>
        </form>
    </div>
    <script src="js/import.js"></script>
</body>
</html>