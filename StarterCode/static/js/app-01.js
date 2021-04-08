console.log("Printing to verify working")

d3.json("samples.json").then((data) => {
    //  Create the Traces
    console.log(data.names);

  // Put the names dropdown info on the page
  // Get a reference to the table body
  var select = d3.select("select");
    console.log(select)
//   // Build the selection list using Arrow Functions...
//    data.names.forEach((name) => {
//      var row = select.append("option" );
//          row.text((name)["value"]);

//    })

let PNames = data.names;
// let PNames = [901,902,903];

// PNames.forEach((sample) => {
data.names.forEach((id) => {

    select
        .append("option")
        .text(id)
        .property("value", id);
});

});
