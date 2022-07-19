const express = require("express");
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const app = express();

var items = [];
var workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function (req, res) {
  var today = new Date()
  currentDay = today.getDay();
  var day = "";

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  var day = today.toDateString("en-US", options);

  // switch (currentDay) {
  //   case 0:
  //     day = "Sunday";
  //     break;
  //   case 1:
  //     day = "Monday";
  //     break;
  //   case 2:
  //     day = "Tuesday";
  //     break;
  //   case 3:
  //     day = "Wednesday";
  //     break;
  //   case 4:
  //     day = "Thursday";
  //     break;
  //   case 5:
  //     day = "Friday";
  //     break;
  //   case 6:
  //     day = "Saturday";
  //     break;
  // }

  res.render("list", {
    listTitle: day,
    newListItems: items
  });


});

app.post("/", function(req, res){
  let item = req.body.newItem;
  console.log(req.body);
  if (req.body.list === "Work List"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems:workItems});
});

app.listen(3000, function () {
  console.log("Server is running on port 3000.")
});
