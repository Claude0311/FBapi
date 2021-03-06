import express from 'express'
import bodyParser from 'body-parser'
import DB from './model/db.js'
import api from './api/api'
import session from 'express-session'
import connect from 'connect-mongo'

const app = express()
DB.once('open',()=>{
	console.log('mongoDB connected')

	//post, get時的解碼json type
	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(bodyParser.json())
	app.use(function (req, res, next) {
		res.header('Access-Control-Allow-Origin', 'http://localhost:3000')//讓其他port(ex.3000)可以發post
		res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept')
		res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
		res.header('Access-Control-Allow-Credentials', 'true')
		next()
	})

	//session
	const MongoStore = connect(session)
	app.use(
		session({
			name: 'houseValuate',
			secret: 'jgevslv', // 用来對session id相關的cookie進行簽名，建議128byte亂碼
			store: new MongoStore({mongooseConnection: DB}),
			saveUninitialized: false, //prevent race conditions
			resave: false,
			cookie: {maxAge: 60 * 60 * 1000}
		})
	)
	
	app.get('/', (_,res) => {
		res.send('hello world')
	})
	
	app.use(api)
	
	app.listen(process.env.PORT || 4000,  () => {
		// require('./util/crawler')(true)
		console.log('server connect')
		console.log(`port name: ${process.env.PORT || 4000}`)
	})
})