const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000
app.use(express.json());


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
let crossingData= {};

const fetchCrossingData = () => {
  fetch('https://bwt.cbp.gov/xml/bwt.xml')
  .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(response.json);
      return response.text();
    })
    .then(data => {
      crossingData = data;
    })
    .catch(error => {
      console.error(`Error fetching data: `, error);
    });
}

app.get('/borderdata', async (req, res) => {
  const crossing = await fetchCrossingData();
  res.json(crossingData);
});