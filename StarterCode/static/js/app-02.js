console.log("Printing to verify working")

d3.json("samples.json").then((data) => {
    //  Create the Traces
    console.log(data);
    console.log(data.metadata[0].id);
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

  // get demographic info
  // var selectedDemo = UFOData.filter(sighting => sighting.datetime === inputValue);
  selectedID = 940
  // var selectedDemo = data.metadata.filter(list => list.id === selectedID);
  var selectedDemo = data.metadata.filter(list => list.id === selectedID);
  // console.log(selectedID);
  // console.log(data.metadata[0].id);
  // console.log(selectedDemo);

  var demographics =  d3.select(".panel-body");
  console.log(demographics)

});
