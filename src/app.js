const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define paths for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templtes/views')
const partialsPath = path.join(__dirname,'../templtes/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static directory to serve
app.use(express.static(publicDirPath)) // Statis Web Pages 

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather',
        name: "Rahul Patel"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name: "Rahul Patel"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        name: "Rahul patel"
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({Error:"You must provide address term!"})
    }

    geocode(req.query.address,(error,{latitude,longitude,location} = {} )=>{

        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }

            return res.send({
                forecast:forecastData.forecase,
                location:location,
                Temp:forecastData.temperature, 
                feelslike:forecastData.feelslike
            })
        })

    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"Not Found",
        name:"Rahul Patel",
        errorMessage:"help artical not found"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:"Not Found",
        name:"Rahul Patel",
        errorMessage:"Page not found"

    })
})

app.listen(3000,()=>{
    console.log("Server is listing on port 3000");
})