const express = require('express')
const { createShortUrl, getHomePage } = require('../controllers/url')
const router = express.Router()


router.get("/", getHomePage)

router.post("/", createShortUrl)




module.exports = router