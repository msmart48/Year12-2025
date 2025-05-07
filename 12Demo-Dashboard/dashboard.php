<?php include "templates/header.php"; ?>
<div class="container">
    <h1 class="title">Dashboard</h1>
    <div class="columns">
        <div class="column">
            <h2 class="subtitle has-text-centered">Total Students</h2>
            <div id="totalStudents" class="box subtitle has-text-centered">0</div>
        </div>
        <div class="column">
            <h2 class="subtitle has-text-centered">Total Nominations</h2>
            <div id="totalNominations" class="box subtitle has-text-centered">0</div>
        </div>
        <div class="column">
            <h2 class="subtitle has-text-centered">Total Activities</h2>
            <div id="totalActivities" class="box subtitle has-text-centered">0</div>
        </div>
    </div>
    <hr>
    <div class="columns">
        <div class="column">
            <h2 class="subtitle">Year Level Distribution</h2>
             <!-- chart 1 space -->    
            <canvas id="yearLevelChart"></canvas>    
        </div>
        <div class="column">
            <h2 class="subtitle">Nominations by Sport</h2>
            <canvas id="sportChart"></canvas>
        </div>
    </div>
    <hr>
    <div class="columns">
        <div class="column is-half">
            <h1 class="title">Filter Data</h1>
            <select id ="yearLevel" class="select is-primary" style="width: 200px;">
                <option value="all">All Years</option>
                <option value="7">Year 7</option>
                <option value="8">Year 8</option>
                <option value="9">Year 9</option>
            </select>
            <button onclick="filterData()" class="button is-primary">Filter</button>
            <canvas id="filteredChart" style="width: 50%;"></canvas>
        </div>
        <div class ="column is-half">
            <h1 class="title">Search Student Data</h1>
            <input type="text" id="search" class="input" placeholder="Search by name...">
            <button onclick="searchStudent()" type="button" class="button is-primary">Search</button>
            <div id="searchResults" class="box subtitle">No results</div>
        </div>

        
    </div>
    
   
</div>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="js/dashboard.js"></script>
