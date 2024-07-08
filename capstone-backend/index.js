const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000
app.use(express.json());

const xml2js = require('xml2js');
const parser = new xml2js.Parser();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
// setting up routes
app.get('/', (req, res) => {
    res.send('<h1>Migra</h1>')
  })
app.use((req, res, next) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Allow requests from http://localhost:5173
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow GET, POST, PUT, and DELETE requests
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Access-Control-Allow-Origin'); // Allow Content-Type and Authorization headers
    res.setHeader('Access-Control-Max-Age', '3600'); // Cache CORS headers for 1 hour
    next(); // Pass the request to the next middleware or route handler
  });

app.post('/users', async (req, res) => {
  const {email, name, googleId, imgUrl} = req.body;
  const newuser = await prisma.user.create({
    data: {
      email, 
      name,
      googleId,
      imgUrl
    }
  })
  res.status(201).json(newuser);
});

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users)
});

app.get('/home', (req, res) => {
  res.send('<h1>bruhhh</h1>')
})
let CanadianBorders = [];
let MexicanBorders = [];
let crossingData = [];

const fetchCrossingData = async () => {
  await fetch('https://bwt.cbp.gov/xml/bwt.xml')
  .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      //look into settings, to prevent to be displayed as array of only one item
      parser.parseString( data, (err, result) => {
        if (err) {
            console.error('error', err);
            return;
        }
        crossingData = result;
        console.log(crossingData)
    })
    })
    .catch(error => {
      console.error(`Error fetching data: `, error);
    });
    for (const item in crossingData.border_wait_time.port) {
      if (crossingData.border_wait_time.port[item].border == "Canadian Border") {
        CanadianBorders.push({ 
          border : crossingData.border_wait_time.port[item].border,
          borderRegion : crossingData.border_wait_time.port[item].port_name,
          crossingName : crossingData.border_wait_time.port[item].crossing_name,
          hours : crossingData.border_wait_time.port[item].hours,
          portStatus : crossingData.border_wait_time.port[item].port_status,
          passengerVehicleWait : crossingData.border_wait_time.port[item].passenger_vehicle_lanes[0].standard_lanes[0].delay_minutes,
          passengerVehicleWait : crossingData.border_wait_time.port[item].pedestrian_lanes[0].standard_lanes[0].delay_minutes
      }) }
      else {
        MexicanBorders.push({ 
          border : crossingData.border_wait_time.port[item].border,
          borderRegion : crossingData.border_wait_time.port[item].port_name,
          crossingName : crossingData.border_wait_time.port[item].crossing_name,
          hours : crossingData.border_wait_time.port[item].hours,
          portStatus : crossingData.border_wait_time.port[item].port_status,
          passengerVehicleWait : crossingData.border_wait_time.port[item].passenger_vehicle_lanes[0].standard_lanes[0].delay_minutes,
          pedestrianLaneWait : crossingData.border_wait_time.port[item].pedestrian_lanes[0].standard_lanes[0].delay_minutes
      })
      }
    }
    crossingData = { 
    lastUpdatedDate : crossingData.border_wait_time.last_updated_date,
    lastUpdatedTime : crossingData.border_wait_time.last_updated_time,
    numOfPorts : crossingData.border_wait_time.number_of_ports,
    allMexicanPorts : MexicanBorders,
    allCanadianPorts : CanadianBorders
};
}

app.get('/borderdata', (req, res) => {
  fetchCrossingData()
  res.json(crossingData);
});

app.post('/usersposts', async (req, res) => {
  const {id, userInput, userId, borderNum} = req.body;
  const newcomment = await prisma.comment.create({
    data: {
      id,
      userId,
      borderNum,
      userInput
    }
  })
  res.status(201).json(newcomment);
});

app.get('/usersposts', async (req, res) => {
  const comments = await prisma.comment.findMany();
  res.json(comments)
});