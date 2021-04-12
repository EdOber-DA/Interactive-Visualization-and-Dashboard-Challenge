// Code to read samples.json, set up dropdowns and generate plots from selected patient
// Read in the data
d3.json("./data/samples.json").then((data) => {
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

// Seed the initial load with subject id = 940 and call the plots


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
    var cell = demographics.append("h6");
    cell.text(key + ": " + selectedList[key]);    
  });

// Pull off the samples information for this selected patient that will be used in the graphs / charts / guage 
var samples_selected = data.samples.filter(list => list.id === selectID); 

//********************** Bar Plot Code **************//
// prep the data
// slice off the top 10 values for the bar length 
var t10_sample_values = samples_selected[0].sample_values.slice(0,10);

// slice off the top 10 otu_ids for the bar chart 
var t10_otu_ids = samples_selected[0].otu_ids.slice(0, 10); 
// Need to add "OTU" prefix to each entry to avoid it being handled as numeric and scaling
var t10_otu_ids_w_prefix = []

t10_otu_ids.forEach(i => 
{ var substring = t10_otu_ids_w_prefix.push(`OTU ${i}`
)});

// slice off the top 10 otu_lables for the hovertext
var t10_otu_labels = samples_selected[0].otu_labels.slice(0,10);

// Build the chart
// Trace1 for the bar chart Data
  var bar_Trace = {
    x: t10_sample_values, 
    y: t10_otu_ids_w_prefix, 
    text: t10_otu_labels, 
    type: "bar",
    orientation: "h",
    mode: 'markers',
    marker: {
      color: 'coral'
      // Height: 600,
      // Width: 50
    }
  };

// data
  var bar_Data = [bar_Trace];

// Apply the group bar mode to the layout, w reverse to stack from bottom up with least
  var bar_Layout = {
    title: {
      text:`Top 10 OTUs for Test Subject ID No: ${selectID}`,
      font: {
        family: 'Times New Roman, serif',
        size: 24,
        color: 'black'
    },
    },
    
    yaxis :{autorange: "reversed"},
    hoverlabel: {
      bgcolor:"pink",
      font_size:15,
      font_family:"Times New Roman, serif"}

  };

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bar", bar_Data, bar_Layout);
// ********************* Bar Plot Code **************//

// ********************* Bubble Plot Code **************//
// Pull ALL the values for the selected patient, no smecial handing needed
var otu_ids = samples_selected[0].otu_ids;
var sample_values = samples_selected[0].sample_values;
var otu_labels = samples_selected[0].otu_labels;

// Build the chart
// Trace1 for the bar chart Data
  var bubble_Trace = [{
    x: otu_ids,
    y:sample_values,
    text: otu_labels,
    mode:"markers",
    marker:{
            size:sample_values,
            color:otu_ids,
            opacity: .5,
            colorscale:[
              //Let first 10% (0.1) of the values have color xxxxxx
                [0,   '#ffa07a'],[0.1, '#ffa07a'],
              //Let 10%-20% (0.1-0.2) of the values have color xxxxxx...etc... 
                [0.1, '#ffa500'],[0.2, '#ffa500'],
                [0.2, '#ff8c00'],[0.3, '#ff8c00'],
                [0.3, '#ff7f50'],[0.4, '#ff7f50'],
                [0.4, '#ff6347'],[0.5, '#ff6347'],
                [0.5, '#ff4500'],[0.6, '#ff4500'],
                [0.6, '#d2691e'],[0.7, '#d2691e'],
                [0.7, '#cd853f'],[0.8, '#cd853f'],
                [0.8, '#b8860b'],[0.9, '#b8860b'],
                [0.9, '#8b4513'],[1.0, '#8b4513'],
            ],
            showscale:true
        }
    }]
  var bubble_layout = {
      title: {
          text: `Test Subject No.: ${selectID}`,
          font: {
              family: 'Times New Roman, serif',
              size: 24,
              color: 'black'
          }
  }}
  Plotly.newPlot("bubble", bubble_Trace, bubble_layout)
// ********************* Bubble Plot Code **************//

//


//
}


});
