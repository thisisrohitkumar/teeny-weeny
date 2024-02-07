const mongoose = require('mongoose')
const urlModel = require('../models/url')
const shortid = require('shortid');

const createShortUrl = async (req, res) => {
    const body = req.body
    if(!body.url){
        return res.status(400).json({msg: 'URL is required!'})
    }

    const redirectUrl = body.url

    const shortId = shortid.generate()

   await urlModel.create({
        shortUrl: shortId,
        redirectUrl: redirectUrl
    })

    return res.render('index', {
        shortId: shortId
    })
    // return res.status(201).json({shortId: shortId})
}

// const redirectToUrl = async (req, res) => {
//     const shortId = req.params.shortId
//     console.log(shortId)
//     const entry = await urlModel.findOne({shortId})
//     console.log(entry)
//     return res.status(200).redirect(entry.redirectUrl)
// }

module.exports = {
    createShortUrl,
    // redirectToUrl
}