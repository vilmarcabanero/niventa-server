const express = require('express')
const env = require('dotenv')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//routes
const userRoutes = require('./routes/user')

//environment variable or you can say constants
env.config()

//mongodb connection
//mongodb+srv://<username>:<password>@entropiya-free-cluster.vo2hc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose
	.connect(
		`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@entropiya-free-cluster.vo2hc.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => {
		console.log('Database connected')
	})

app.use(bodyParser())
app.use('/api', userRoutes)

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`)
})
