
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const request = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const mail = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed"
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/670bcbcc57"

  const options = {
    method: "POST",
    auth: "Patrick1:30ef26b2c2f25b2ea1bdf09e20846e98-us14"
  }

  const request = https.request(url, options, function(response){
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  req.end();

});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
