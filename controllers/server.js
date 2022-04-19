require('dotenv').config()

//Dependencies
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3002
const methodOverride = require('method-override')
const morgan = require('morgan')
const Product = (require('../models/product.js'))
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

//Seed Route
const productsSeed = require('../models/products_seed.js')

app.get('/products/seed', (req,res)=>{
    Product.deleteMany({}, (error, allProducts)=> {})

    Product.create(productsSeed, (error, data)=>{
        res.redirect('/products')
    })
})

//INDUCES
//Index
app.get('/products', (req,res)=>{
    Product.find({}, (error, allProducts)=>{
        res.render('index.ejs', {products: allProducts})
    })
})

//New
app.get('/products/new', (req,res)=>{
    res.render('new.ejs')
})

//Delete
app.delete('/products/:id', (req,res)=>{
    Product.findByIdAndDelete(req.params.id, (err,data)=>{
        res.redirect('/products')
    })
})

//Update

//Create
app.post('/products', (req,res)=>{
    Product.create(req.body, (error, createdProduct)=>{
        res.redirect('/products')
    })
})

//Edit
app.get('/products/:id/edit', (req,res)=>{
    Product.findById(req.params.id, (error, editedProduct)=>{
        res.render('edit.ejs', {
            product: editedProduct
        })
    })
})

//Show
app.get('/products/:id', (req,res)=>{
    Product.findById(req.params.id, (err, foundProduct)=>{
        res.render('show.ejs', {oneProduct: foundProduct})
    })
})


app.listen(PORT, ()=>console.log('Express is connected'))