# Interactive-Visualization-and-Dashboard-Challenge - Belly Button Biodiversity

Challenge is to build a web dashboard depicting data in demographic list, bar, bubble, and gauge formats.  Also, dynamically create dropdown and based on selection generate new charts.


## Overview

Interactive-Visualization-and-Dashboard-Challenge - Displays HTML page with dropdown list, and handlers to execute reading value entered upon clicking button, or hitting enter. Filters data based on the entered data, clears any pre-exiting data in the demographic area and presents the filtered data in the 3 charts.   Pre-loads the dashboard with data on initial entry so it displays data for subject id 940.

Landing page for the assignment: https://edober-da.github.io/Interactive-Visualization-and-Dashboard-Challenge/

* Included in this repository are 4 Folders: static with the css and javascript code, data with the input json, images used, and notes from the development.  
   
  * [Javascript and Style Sheet:](static) Contains the js and css subfolders for the code.  
  
  * [Study Data:](data) JSON data for the dashboard.

  * [Images:](Images) Images for the site. 

  * [Documentation:](Notes) CORS documentation and color palette snippets used for deciding colors.  

## Files

* [Landing Page:](index.html) Starting point for the site with dropdown field that initiates the data selection for the table. Displays the selected data in various charts and tables. 


* [Code for Dashboard:](static)

  * [JavaScript code "app.js":](static/js/app.js) Sets up the input data, accesses the DOM, triggers the event handlers to read the input, selects the data, and updates the DOM with the charts and data rows. Also resets the table on each new selection to clear previous data rows.  

  * [CSS Styles:](static/css/style.css) Style sheet for the site. 


* [Images for the site:](Images/BB_Diversity.jpg) Background image for the landing page.


* [Data for the site:](data/samples.json) Data from the study. 


   