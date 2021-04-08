console.log("Printing to verify working")

d3.json("samples.json").then((data) => {
    //  Create the Traces
    console.log(data.names);

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

});
