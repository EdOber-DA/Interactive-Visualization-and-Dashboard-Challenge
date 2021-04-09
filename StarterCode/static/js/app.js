// console.log("Printing to verify working")

d3.json("samples.json").then((data) => {
    //  Create the Traces
    console.log(data);
  //    console.log(data.metadata[0].id);
  // Put the names dropdown info on the page
  // Get a reference to the table body
  var select = d3.select("select");
  //  console.log(select)

  // cycle through names list to create the dropdown
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
  console.log("in selection handler")
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var selectID = dropdownMenu.property("value");
  // console.log(selectID);
  // console.log(parseInt(selectID));
  
  // get demographic info
  var selectedDemo = data.metadata.filter(list => list.id === parseInt(selectID));
  // console.log("selectedDemo");
  //   console.log(selectedDemo);
  
  selectedList = selectedDemo[0];
  console.log("selectedList");
  console.log(selectedList);

  // Select the demographics panel    
  var demographics =  d3.select(".panel-body");
  // console.log(demographics)
  
  // clear demographcs of any existing info
  // first get how many rows to delete
  var size = Object.keys(selectedList).length;
  // console.log("items in the selectedList");
  // console.log(size);

  var elems = document.getElementsByTagName('h2');
  console.log("Number of h2 elements");
  console.log(elems);
  console.log(elems.length)
  
  Object.keys(elems).reverse().forEach(function(key, i) {
    if (i > -1) {
      console.log(elems[key]);
      elems[key].remove();
    }
  });



 
// iterate through the rows, backwards from end to delete tr entries, but not the header (rowcount-1)


// add the new rows  
Object.keys(selectedList).forEach(function(key) {
    console.log(key + " " + selectedList[key]);
    var cell = demographics.append("h2");
    cell.text(key + ": " + selectedList[key]);    

    
  });

  // var elems = document.getElementsByTagName('h2');
  // console.log(elems);

  // var cell = demographics.append("h1");
  // cell.text("test");

 
  // selectDemo.forEach(([key, value]) => {
  //   var row = demographics.append("h1");
  //   cell.text(value);

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
