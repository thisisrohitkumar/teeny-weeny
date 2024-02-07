require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const connectToDB = require("./connect");
const urlRouter = require('./routes/url')
const urlModel = require('./models/url')
const path = require('path')

// Connecting to MongoDB...
connectToDB(process.env.MONGO_URL)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("Connection Error : ", err));

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', urlRouter)
app.use('/url', urlRouter)

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));


app.get('/url/:shortId', async (req, res) => {
  const shortId = req.params.shortId
    const entry = await urlModel.findOne({shortUrl: shortId})
    return res.status(200).redirect(entry.redirectUrl)
})



app.listen(PORT, () => console.log(`Server is listening at PORT No. ${PORT}`));