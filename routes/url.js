const express = require('express')
const { createShortUrl, redirectToUrl } = require('../controllers/url')
const router = express.Router()


router.post("/", createShortUrl)

// router.get("/", redirectToUrl)

module.exports = router