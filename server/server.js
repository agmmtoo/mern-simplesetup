import express from 'express'
import path from 'path'
import { MongoClient } from 'mongodb'

import devBundle from './devBundle'
import template from '../template'

const app = express()

// database
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSimpleSetup'
MongoClient.connect(url, (err, db) => {
    if (err) return;
    console.log("Connect successfully to mongodb server")
    db.close()
})

// webpack middleware to compile client codes
devBundle.compile(app)

// static files
const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

// serve template html at root route
app.get('/', (req, res) => {
    res
        .status(200)
        .send(template())
})

// PORT
let port = process.env.PORT || 3000

// server listen
app.listen(port, err => {
    if (err) console.log(err)
    console.info('Server started on port %s.', port)
})
