// Code to read samples.jsaon, set up dropdowns and generate plots from selected patient
// Read in the data
d3.json("samples.json").then((data) => {
    //  print a copy of the json for checking data
    console.log(data);
 
  // Get a reference to the selection area
  var select = d3.select("select");
 
  // cycle through the names list of the json to create the dropdown
  data.names.forEach((id) => {
    select
        .append("option")
        .text(id)
        .property("value", id);
});

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function updatePlotly() {
 
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
 
  // Assign the value selected in the dropdown menu option to a variable
  var selectID = dropdownMenu.property("value");
  
  // get demographic info for the patient selected 
  var selectedDemo = data.metadata.filter(list => list.id === parseInt(selectID));
  // console.log(selectedDemo);
  

  // convert the selected info to a list
  selectedList = selectedDemo[0];
  
  // if already data, need to clear demographcs of any existing info
  // 1st - Select the demographics panel so we can clear out any pre-existing items displayed     
  var demographics =  d3.select(".panel-body");
    
  // 2nd - get how many items exist that need to be to deleted, if "0" then will fall through
  var elems = document.getElementsByTagName('h6');
  
  // 3rd - iterate through the items, backwards from end to delete previous h6 entries
  Object.keys(elems).reverse().forEach(function(key, i) {
    if (i > -1) {
       elems[key].remove();
    }
  });

// now that the panel is clean, add the new items  
Object.keys(selectedList).forEach(function(key) {
    // console.log(key + " " + selectedList[key]);
    var cell = demographics.append("h6");
    cell.text(key + ": " + selectedList[key]);    
  });

var samples_selected = data.samples.filter(list => list.id === selectID); //.otu_ids.slice(0, 10);
// console.log(selectID);
// console.log(data.samples[1].id);
console.log(samples_selected);

var otu_ids = samples_selected[0].otu_ids.slice(0, 10); 
console.log(otu_ids);

var otu_labels = samples_selected[0].otu_labels.slice(0,10);
console.log(otu_labels);

var sample_values = samples_selected[0].sample_values.slice(0,10);
console.log(sample_values);    

  // Initialize x and y arrays
  // var x = [];
  // var y = [];

  // if (dataset === 'dataset1') {
  //   x = [1, 2, 3, 4, 5];
  //   y = [1, 2, 4, 8, 16];
  // }

  // else if (dataset === 'dataset2') {
  //   x = [10, 20, 30, 40, 50];
  //   y = [1, 10, 100, 1000, 10000];
  // }

  // // Note the extra brackets around 'x' and 'y'
  // Plotly.restyle("plot", "x", [x]);
  // Plotly.restyle("plot", "y", [y]);
}


});
