require('dotenv').config()

//Dependencies
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3002
const methodOverride = require('method-override')
const morgan = require('morgan')
const DATABASE_URL = process.env.DATABASE_URL
const mongoose = require('mongoose')
const db = mongoose.connection

//Mongoose Config
mongoose.connect(DATABASE_URL)
db.on('connected', ()=> console.log('Mongo is connected'))
db.on('error', (err)=> console.log(err.message + 'Mongo errored'))
db.on('disconnected', ()=> console.log('Mongo disconnected'))

//Middleware
app.use(express.urlencoded({extended:true}))
app.use(morgan('tiny'))
app.use(express.static('public'))
app.use(methodOverride('_method'))