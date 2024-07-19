const { PrismaClient } = require("@prisma/client");
const express = require("express");
const xml2js = require("xml2js");
const { fetchCrossingData } = require("./data-fetcher");
require("dotenv").config();
const multer = require( 'multer' );
const  {S3Client} = require( '@aws-sdk/client-s3');
const dotenv = require( 'dotenv' );
const {PutObjectCommand} = require( '@aws-sdk/client-s3');

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
dotenv.config()

const storage  = multer.memoryStorage()
const upload = multer({storage: storage})

const bucketName=process.env.BUCKET_NAME
const bucketRegion=process.env.BUCKET_REGION
const accessKey=process.env.ACCESS_KEY
const secretAccessKey=process.env.ACCESS_KEY
upload.single('avatar')

// const s4 = new S3Client({
//   credentials: {
//     secretAccessKey: secretAccessKey,
//     accessKeyId: accessKey
//   },
//   region: bucketRegion
// })

createWebSocketNotification();

settingRoutes();
setHeaders();

fetchBorderData();
createUserComment();
fetchAllComments();

createNewUser();
fetchAllUsers();

app.get("/userprofile/uploads", async (req,res) => {
  const posts = await prisma.uploads.findMany({orderBy: [{created: 'desc'}]})
  res.send(posts)
})
postingMedia();

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
}

function createUserComment() {
  app.post("/usersposts", async (req, res) => {
    const { id, userInput, userId, borderNum, postDate, postTime } = req.body;
    const newcomment = await prisma.comments.create({
      data: {
        id,
        userId,
        borderNum,
        userInput,
        postDate,
        postTime
      },
    });
    res.status(201).json(newcomment);
  });
}

function fetchBorderData() {
  app.get("/borderdata", async (req, res) => {
    console.log("Server receives request ")
    crossingData = await fetchCrossingData();
    res.json(crossingData);
    console.log("This fetch is being made by BorderPage")
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
