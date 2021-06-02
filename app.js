const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = "661e3429bacc0ca6c0d57cab03d957ca";
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apiKey +"&units=" + unit;
  https.get(url, function(response){
  response.on("data", function(data){
    const weatherData = JSON.parse(data)
    const temp = weatherData.main.temp
    const desc = weatherData.weather[0].description
    const icon = weatherData.weather[0].icon
    const iconUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png"

    res.write("<h1>" + query  +"</h1>");
    res.write("<h2>" + temp + " degree Celsius </h2>");
    res.write("<p>The weather is currently "+desc+"</p>");
    res.write("<img src="+iconUrl+">");
    res.send();
  })
  })
})

app.listen(3000, function() {
  console.log("Server is running on port 3000")
})
