const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geoCode = require('./utils/geocode')

const forecast = require('./utils/forecast')

//Define path for views
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        description: 'This is a weather page',
        name: 'Sagar'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
          error: 'Address is missing'
        })
    }

    geoCode(req.query.address, (error, {longitutude, latitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(longitutude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            console.log(forecastData)
            return res.send({
                forecast: 'The current temperature is ' + forecastData.temperature + ' And it feels like ' + forecastData.feelslike,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        description: 'This is about me page',
        name: 'Sagar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        description: 'This is a help page',
        name: 'Sagar'
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Sagar', 
        errorMessage: 'Help article not found'
    })
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
      return res.send({
          error:'Search term is missing'
      })    
    }

    res.send({
        products: []
    })
})
app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'sagar',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})