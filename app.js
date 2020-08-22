const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));



// const weatherData = (url) => {
//     http.get(url, (res) => {
//     console.log('statusCode:', res.statusCode);
//     console.log('headers:', res.headers);
  
//     res.on('data', (d) => {
//       const dataTemp = JSON.parse(d);
//       res.send(dataTemp.main.temp);
//     });
  
//   }).on('error', (e) => {
//     console.error(e);
//   });
//   }

app.get('/', (req,res) => {
    res.sendFile(__dirname+"/index.html");
})

app.post('/', (req,res) => {
    const city = req.body.cityName;
    const keyWeather = '6d3587b324c93abb8e509025c27c4000';
    let url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=" + keyWeather;
    // weatherData(url);
    //res.send(req.body.cityName);
    // res.sendFile(__dirname+'/weatherPage.html');

    https.get(url, (response) => {
        response.on('data', (data) => {
          let dataTemp = JSON.parse(data);
          let tt = dataTemp.main.temp;
        res.sendFile(__dirname+'/weatherPage.html');
        
        });
      
      }).on('error', (e) => {
        console.error(e);
      });
      
})



app.listen(3000, () => {
    console.log('Server is running on port 3000 ... ');
})