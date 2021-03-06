const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config.
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location.
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory.
app.use(express.static(publicDirPath));

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jai'
    });
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Jai'
    });
})

app.get('/help',(req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Help Message',
        name: 'Jai'
    });
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide an address.'
        })
    }

    geocode(req.query.address,(error, {Lat, Long, Location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(Lat, Long, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                Location,
                address: req.query.address
            })
        })
    });
})

app.get('/products',(req, res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term.'
        })
    }

    console.log(req.query.search);
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        name:'Jai',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        name:'Jai',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on Port ' + 3000);
});