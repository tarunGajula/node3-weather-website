const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocodeUtility = require('./utils/geocode')
const forecastUtility = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3003

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handle bars engine and view locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
 
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Tarun'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Tarun'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is to help you',
        title: 'Help',
        name: 'Tarun'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide address'
        })
    }
    geocodeUtility.geocode(req.query.address, (error,data)=>{
        console.log('Data ===> ',data)
      })
      console.log('Just before forecast')
      forecastUtility.forecast(req.query.address, (error,fdata)=>{
        console.log('Forecast Data ===> ',fdata)
     
    console.log(req.query.address)
    res.send({
        weatherData: fdata.temperature
        })
    })
    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
        console.log(req.query.search)
        res.send({
            products: []
        })
    
})

app.get('/help/*', (req, res) => {
    res.render('pageNotFound', {
        errorMsg: '404, Help article not found'
    })
}) 

app.get('*', (req, res) => {
    res.render('pageNotFound', {
        errorMsg: '404, Page not found'
    })
}) 

app.listen(port, () => {
    console.log('Server is up on port '+port)
})