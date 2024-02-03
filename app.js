require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const connectToDB = require("./connect");
const urlRouter = require('./routes/url')
const urlModel = require('./models/url')

// Connecting to MongoDB...
connectToDB(process.env.MONGO_URL)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("Connection Error : ", err));

// Middlewares
app.use(express.json())
app.use('/url', urlRouter)

// app.use('/url/:shortId', urlRouter)

app.get('/:shortId', async (req, res) => {
  const shortId = req.params.shortId
    const entry = await urlModel.findOne({shortUrl: shortId})
    return res.status(200).redirect(entry.redirectUrl)
})



app.listen(PORT, () => console.log(`Server is listening at PORT No. ${PORT}`));