// Code to read samples.json, set up dropdowns and generate plots from selected patient
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

// Pull off the samples information for this selected patient  
var samples_selected = data.samples.filter(list => list.id === selectID); 
// console.log(selectID);
// console.log(data.samples[1].id);
// console.log(samples_selected);

// slice off the top 10 otu_ids for the bar chart 
var otu_ids = samples_selected[0].otu_ids.slice(0, 10); 
// console.log(otu_ids);

// Need to add "OTU" prefix to each entry to avoid it being handled as numeric and scaling
var otu_ids_w_prefix = []
otu_ids.forEach(i => 
{ var substring = otu_ids_w_prefix.push(`OTU ${i}`
)});
// console.log(otu_ids_w_prefix);

// slice off the top 10 otu_lables for the hovertext
var otu_labels = samples_selected[0].otu_labels.slice(0,10);

// slice off the top 10 values for the bar length 
var sample_values = samples_selected[0].sample_values.slice(0,10);
// console.log(sample_values);  
//********************** Bar Plot Code **************//
  
  // Trace1 for the bar chart Data
  var trace1 = {
    y: otu_ids_w_prefix, //data.map(row => row.greekSearchResults),
    x: sample_values, //data.map(row => row.greekName),
    text: otu_labels, //data.map(row => row.greekName),
    type: "bar",
    orientation: "h",
    mode: 'markers',
    marker: {
      color: 'blue',
      outerHeight: 250
    }
  };

  // data
  var chartData = [trace1];

  // Apply the group bar mode to the layout, w reverse to stack from bottom up with least
  var layout = {
    title: "Top 10 OTUs",
    yaxis :{autorange: "reversed"},
    hoverlabel: {
      bgcolor:"white",
      font_size:16,
      font_family:"Rockwell"}

    //  margin: {
    //   l: 30,
    //   r: 30,
    //   t: 30,
    //   b: 30
    // }
  };

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bar", chartData, layout);
// ********************* Bar Plot Code **************//

// ********************* Bubble Plot Code **************//

// ********************* Bubble Plot Code **************//
}


});
