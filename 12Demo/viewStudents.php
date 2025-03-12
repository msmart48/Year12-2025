 <?php include "templates/header.php"; ?>
 <div class="container">
        <h1 class="title">View Data</h1>
        <input type="text" id="search" onkeyup="searchPlayers()" placeholder="Search Players">
        <button class="button is-primary" onclick="getData('all')">Show All</button>
        <button class="button is-primary" onclick="getData('year')">Show Year 12</button>
        <table class="table is-bordered" id="dataOutput">
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Year Level</th>
            </tr>
        </table>
        <hr>
        
</div>
        <script src="js/viewData.js"></script>
    </body>
</html>