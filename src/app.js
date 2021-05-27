//Requires
require('./config/config')
const express = require ("express")
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const session = require('express-session');
var MemoryStore = require('memorystore')(session)

app.use(session({
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))

app.use((req, res, next) =>{
	if(req.session.usuario){		
		res.locals.sesion = true
		res.locals.nombre = req.session.nombre
	}	
	next()
})

//Paths
const dirPublic = path.join(__dirname, '../public')

//Statics
app.use(express.static(dirPublic))

//BodyParser 
app.use(bodyParser.urlencoded({extended: false}))

//Routes
app.use(require('./routes/index'))

mongoose.connect(process.env.URLDB, {useNewUrlParser: true, useUnifiedTopology: true}, (err, resultado) => {
	if (err){
		return console.log(error)
	}
	console.log("conectado")
});

// SETINGS 
const port=process.env.PORT||3000

//SERVIDOR
app.listen(port,() => {
  console.log(`server on port  ${port}`)
});
