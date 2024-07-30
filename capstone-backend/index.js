const { PrismaClient } = require("@prisma/client");
const express = require("express");
const xml2js = require("xml2js");
const { fetchCrossingData } = require("./data-fetcher");
require("dotenv").config();
const dotenv = require("dotenv");
const cors = require("cors");
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(cors());
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

bookmarkCrossing();

function fetchAllComments() {
  app.get("/usersposts", async (req, res) => {
    const comments = await prisma.comments.findMany();
    res.json(comments);
  });
  app.delete("/usersposts/:id", async (req, res) => {
    const commentId = parseInt(req.params.id);
    await prisma.comments.delete({ where: { id: commentId } });
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
    const { id, userInput, userId, borderNum, postDate, postTime, likes } =
      req.body;
    const newcomment = await prisma.comments.create({
      data: {
        id,
        userId,
        borderNum,
        userInput,
        postDate,
        postTime,
        likes,
      },
    });
    res.status(201).json(newcomment);
  });
}

function fetchBorderData() {
  app.get("/borderdata", async (req, res) => {
    const query = req.query.search;
    crossingData = await fetchCrossingData();
    if (query) {
      const filteredPorts = crossingData.allMexicanPorts.filter((item) => {
        return (
          item.borderRegion[0].toLowerCase().includes(query.toLowerCase()) ||
          item.crossingName[0].toLowerCase().includes(query.toLowerCase()) ||
          item.border[0].toLowerCase().includes(query.toLowerCase())
        );
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
  });
  const wss = new WebSocket.Server({ server: server });
  wss.on("connection", (ws) => {
    ws.send("Welcome to the server!");
    ws.on("message", (message) => {
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
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      borderName + " port of entry with Mexico"
    )}&key=${apiKey}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const newCoords = data.results[0].geometry.location;
        const newAddress = data.results[0].formatted_address;
        const result = { newCoords, newAddress };
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
        let relevantComments = [];
        for (const item in data) {
          if (data[item].userId == userIdentificator) {
            relevantComments.push(data[item]);
          }
        }
        res.json(relevantComments);
      });
  });
}

function bookmarkCrossing() {
  app.put("/userprofile/:borderindex", async (req, res) => {
    const borderIndex = req.params.borderindex;
    const userEmail = req.query.email;
        async function postBookmark ()  {
          const newBookmark = await prisma.bookmarks.create({
            data: {
              borderIndex,
              userEmail,
            },
          });
          res.json(newBookmark);
        }
        postBookmark()
  });
  app.get("/bookmarked/:userEmail", async (req, res) => {
    const userEmail = req.params.userEmail;
    const userBookmarked = await prisma.bookmarks.findMany({
      where: { userEmail: userEmail },
    });
    res.json(userBookmarked);
  });
  app.delete("/bookmarked/:borderIndex", async (req, res) => {
    const borderIndex = req.params.borderIndex;
    await prisma.bookmarks.delete({ where: { borderIndex: borderIndex } });
    res.json({ message: "bookmark deleted successfully" });
  });
}
  // app.delete("/usersposts/:id", async (req, res) => {
  //   const commentId = parseInt(req.params.id);
  //   await prisma.comments.delete({ where: { id: commentId } });
  //   res.json({ message: "Comment deleted successfully" });
  // });
  //   const comment = await prisma.comments.findUnique({
  //     where: { id: commentId },
  //   });




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
