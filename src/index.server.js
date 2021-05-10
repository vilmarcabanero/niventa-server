const express = require('express')
const env = require('dotenv')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//routes
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')

//environment variable or you can say constants
env.config()

const CONNECTION_URL = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@entropiya-free-cluster.vo2hc.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
mongoose
	.connect(CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log('Database connected')
	})

app.use(bodyParser())
app.use('/api', authRoutes)
app.use('/api', adminRoutes)


app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`)
})
