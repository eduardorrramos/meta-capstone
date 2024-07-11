const { PrismaClient } = require("@prisma/client");
const express = require("express");
const xml2js = require("xml2js");
const { fetchCrossingData } = require("./data-fetcher");
require("dotenv").config();

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

createWebSocketNotification();

settingRoutes();
setHeaders();

fetchBorderData();
createUserComment();
fetchAllComments();

createNewUser();
fetchAllUsers();

function fetchAllComments() {
  app.get("/usersposts", async (req, res) => {
    const comments = await prisma.comment.findMany();
    res.json(comments);
  });
}

function createUserComment() {
  app.post("/usersposts", async (req, res) => {
    const { id, userInput, userId, borderNum } = req.body;
    const newcomment = await prisma.comment.create({
      data: {
        id,
        userId,
        borderNum,
        userInput,
      },
    });
    res.status(201).json(newcomment);
  });
}

function fetchBorderData() {
  app.get("/borderdata", async (req, res) => {
    crossingData = await fetchCrossingData();
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
      wss.clients.forEach((client) => {
        client.send("Emergency Alert from backend");
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
