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

let crossingData= [];
const fetchCrossingData = async () => {
  await fetch('https://bwt.cbp.gov/api/bwtrss/getAllPortsRss/Mexico')
  .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      parser.parseString( data, (err, result) => {
        if (err) {
            console.error('error', err);
            return;
        }
        console.log(result.rss.channel)
        crossingData = result.rss.channel[0].item;
        console.log(crossingData)
    })
    })
    .catch(error => {
      console.error(`Error fetching data: `, error);
    });
}

app.get('/borderdata', (req, res) => {
  fetchCrossingData();
  res.json(crossingData);
});