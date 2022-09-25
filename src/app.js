const express = require('express')
const app = express()
const port = 3000
const reporterRouter = require('./router/reporter-router')
const NewsRouter = require('./router//news-router')
require('./db/mongoose')
app.use(express.json()) 
app.use(reporterRouter)
app.use(NewsRouter)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})