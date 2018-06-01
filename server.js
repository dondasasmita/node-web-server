const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000
const app = express()

hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('sayIt', (message) => {
    return message.toUpperCase()
})
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))

app.use((req,res,next) => {
    var now = new Date().toString()
    var log = `${now} : ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log',log + "\n",(error) => {
        if (error) {
            console.log('Unable to append to server.log')
        }
    })
    next() 
})

// app.use((req,res,next) => {
//     res.render('maintenance', {
//         pageTitle: 'Maintenance Page',
//         message: 'We will be right back.'
//     })
// })


app.get('/',(req,res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to our page',
        currentDate: new Date().getDate(),
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    })
})

app.get('/projects', (req, res) => {
    res.render('projects.hbs')
})

app.get('/registration', (req,res) => {
    res.render('registration.hbs')
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request.'
    })
})

// app.get('/maintenance', (req,res) => {
//     res.render('maintenance.hbs' , {
//         pageTitle: 'Maintenance Page',
//         message: 'We will be back.'
//     })
// })

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`)
})