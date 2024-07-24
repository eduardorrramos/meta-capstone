const { PrismaClient } = require("@prisma/client");
const express = require("express");
const xml2js = require("xml2js");
const { fetchCrossingData } = require("./data-fetcher");
require("dotenv").config();
const multer = require( 'multer' );
const  {S3Client} = require( '@aws-sdk/client-s3');
const dotenv = require( 'dotenv' );
const {PutObjectCommand} = require( '@aws-sdk/client-s3');
const cors = require('cors');
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
dotenv.config()
const storage  = multer.memoryStorage()
app.use(cors())
const apiKey = "AIzaSyDnk1NQgt08aY9-4tS0ZcG9WvzJc7hsuWE";

createWebSocketNotification();

settingRoutes();
setHeaders();

fetchBorderData();
createUserComment();
fetchAllComments();

createNewUser();
fetchAllUsers();
fetchBorderCoordinates();
fetchUserComments();

postingMedia();


app.get("/userprofile/uploads", async (req,res) => {
  const posts = await prisma.uploads.findMany({orderBy: [{created: 'desc'}]})
  res.send(posts)
})

app.delete("/userprofile/uploads/:id", async (req, res) => {
  const id = req.params.id
  res.send({})
})


function postingMedia() {
  app.post("/userprofile", async (req, res) => {
    console.log("req body", req.body);
    res.send({});
  });
}

function fetchAllComments() {
  app.get("/usersposts", async (req, res) => {
    const comments = await prisma.comments.findMany();
    res.json(comments);
  });
  app.delete("/usersposts/:id", async (req, res) => {
    const commentId = parseInt(req.params.id);
    await prisma.comments.delete({ where: { id:commentId } });
    res.json({ message: "Comment deleted successfully" });
  });
  app.put("/usersposts/:id", async (req, res) => {
    const commentId = parseInt(req.params.id);
    const comment = await prisma.comments.findUnique({
      where: { id: commentId },
    });
    const updatedComment = await prisma.comments.update({
      where: { id: commentId },
      data: { likes: comment.likes + 1 },
    });
    
    res.json({ message: "Comment liked successfully" });
  });
}

function createUserComment() {
  app.post("/usersposts", async (req, res) => {
    const { id, userInput, userId, borderNum, postDate, postTime, likes } = req.body;
    const newcomment = await prisma.comments.create({
      data: {
        id,
        userId,
        borderNum,
        userInput,
        postDate,
        postTime,
        likes
      },
    });
    res.status(201).json(newcomment);
  });
}

function fetchBorderData() {
  app.get("/borderdata", async (req, res) => {
    const query = req.query.search
    crossingData = await fetchCrossingData();
    console.log(crossingData)
    if (query) {
      const filteredPorts = crossingData.allMexicanPorts.filter((item) => {
        return item.borderRegion[0].toLowerCase().includes(query.toLowerCase()) || 
               item.crossingName[0].toLowerCase().includes(query.toLowerCase()) || 
               item.border[0].toLowerCase().includes(query.toLowerCase()) ;
      });
      crossingData.allMexicanPorts = filteredPorts;
    }
    res.json(crossingData);
  });
}

function createWebSocketNotification() {
  const WebSocket = require("ws");
  const server = require("http").createServer(app);
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  const wss = new WebSocket.Server({ server: server });
  wss.on("connection", (ws) => {
    console.log("New client connected!");
    ws.send("Welcome to the server!");
    ws.on("message", (message) => {
      console.log(`Received message: ${message}`);
      let userId = message;
      wss.clients.forEach((client) => {
        client.send(`Emergency Alert from Back-End: ${userId}`);
      });
    });
  });
}

function fetchAllUsers() {
  app.get("/users", async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
  });
}

function fetchBorderCoordinates() {
  app.get("/borderpage/:borderindex", async (req, res) => {
    const borderName = req.params.borderindex;
    console.log("body" + borderName)
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(borderName + " port of entry with Mexico")}&key=${apiKey}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const newCoords = data.results[0].geometry.location;
        const newAddress = data.results[0].formatted_address;
        const result = {newCoords, newAddress}
        res.json(result);
      });
  });
}
function fetchUserComments() {
  app.get("/userprofile/:userid", async (req, res) => {
    const userIdentificator = req.params.userid;
    fetch("http://localhost:5000/usersposts")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        let relevantComments = [];
        for (const item in data) {
          //need to pass in userEmail as parameter or else will return all comments to every user
          if (data[item].userId == userIdentificator) {
            relevantComments.push(data[item]);
          }
        }
        res.json(relevantComments);
      }
    );
  });
}

function createNewUser() {
  app.post("/users", async (req, res) => {
    const { email, name, googleId, imgUrl } = req.body;
    const newuser = await prisma.user.create({
      data: {
        email,
        name,
        googleId,
        imgUrl,
      },
    });
    res.status(201).json(newuser);
  });
}

function setHeaders() {
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Access-Control-Allow-Origin"
    );
    res.setHeader("Access-Control-Max-Age", "3600");
    next();
  });
}

function settingRoutes() {
  app.get("/", (req, res) => {
    res.send("<h1>Migra</h1>");
  });
}
