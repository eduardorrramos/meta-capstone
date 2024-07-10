const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const express = require('express')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000
import { fetchCrossingData } from './data-fetcher'

implementingWebSocket()

settingServerUp()
settingRoutes()
setHeaders()

createNewUser()
fetchAllUsers()

fetchingBorderCrossingData()
createBorderComment()
fetchBorderComments()

function implementingWebSocket() {
  const WebSocket = require('ws')
  const wss = new WebSocket.Server({ server: app })
  wss.on('connection', (ws) => {
    console.log('New client connected!')
    ws.on('message', (message) => {
      console.log(`Received message: ${message}`)
    })
    ws.send('Welcome to the server!')
  })
}

function fetchingBorderCrossingData() {
  app.get('/borderdata', (req, res) => {
    fetchCrossingData()
    res.json(crossingData)
  })
}

function settingServerUp() {
  app.use(express.json());
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}

function fetchBorderComments() {
  app.get('/usersposts', async (req, res) => {
    const comments = await prisma.comment.findMany()
    res.json(comments)
  })
}

function createBorderComment() {
  app.post('/usersposts', async (req, res) => {
    const { id, userInput, userId, borderNum } = req.body
    const newcomment = await prisma.comment.create({
      data: {
        id,
        userId,
        borderNum,
        userInput
      }
    })
    res.status(201).json(newcomment)
  })
}

function fetchAllUsers() {
  app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
  })
}

function createNewUser() {
  app.post('/users', async (req, res) => {
    const { email, name, googleId, imgUrl } = req.body
    const newuser = await prisma.user.create({
      data: {
        email,
        name,
        googleId,
        imgUrl
      }
    })
    res.status(201).json(newuser)
  })
}

function setHeaders() {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE') 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Access-Control-Allow-Origin')
    res.setHeader('Access-Control-Max-Age', '3600') 
    next()
  })
}

function settingRoutes() {
  app.get('/', (req, res) => {
    res.send('<h1>Migra</h1>')
  })
}