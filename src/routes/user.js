const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/signin', (req, res) => {})

router.post('/signup', (req, res) => {
	User.findOne({ email: req.body.email }).exec((error, user) => {
		if (user)
			return res.status(400).json({
				message: 'User is already registered',
			})

		const { firstName, lastName, email, pssword } = req.body
		const _user = new User({
			firstName,
			lastName,
			email,
			pssword,
			username: Math.random(),
		})

    _user.save((error, data) => {
      if(error) {
        return res.status(400).json({
          message: 'Something went wrong'
        })
      } 
      if(data) {
        return res.setMaxListeners(201).json({
          user: data
        })
      }
    })
	})
})

module.exports = router
