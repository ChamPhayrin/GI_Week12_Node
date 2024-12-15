const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express');
const hbs = require('hbs')
const app = express();
const port= process.env.PORT || 3000



// DEFINE PATH FOR EXPRESS CONFIG
let publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// SET UP HANDLE BARS AND VIEWS LOCATION 
app.set('views',viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// SET UP STATIC DIRECTORY TO SERVE
app.use(express.static(publicDirectory))


// app handelers
app.get('/about', (req, res)=>{
  
  res.render('about', {
    title: 'about',
    name: 'chim'
  })
})

app.get('/', (req, res) =>{
  res.render('index', {
    title: 'weather',
    name: 'chim'
  })
})

app.get('/weather', (req, res) => {

  if(!req.query.address){
    return res.send({
      errorMessage: 'Please enter address'
    })
  }
  let unit = req.query.unit || 'f'
  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if(error){
      return res.send({
        errorMessage: error
      })
    }
  
    forecast(latitude, longitude, unit, (error, data) =>{
      if(error){
        return res.send({
          errorMessage: error
        })
      }
  
      res.send({
        forecast: data,
        location:location,
        address: req.query.address,
        unit: unit,
      })
    })
  })
})

app.get('/products', (req, res) => {
  if(!req.query.search){
    return res.send({
      error: 'must add search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help', (req, res) =>{
  res.render('help',{
    title: 'help',
    paragraph: 'this is help page',
    name: 'chim'
  })
})

app.get('/help/*', (req, res) => {
  res.render('404',{
    title: 'error',
    name: 'chim',
    error: 'help article not found'
  })
})

app.get('/*',(req, res) => { //comes last bc hbs will look for matches and will not look at any other matches
  res.render('404',{
    title: 'error',
    name: 'chim',
    error: 'page not found'
  })
})


app.listen(port, ()=>{
  console.log('server is up!')
})