const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const router = require('./Router/router');
const { connectToDatabase } = require('./db/db');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3001;
const cluster = require('cluster');
const os = require('os');

// app.use(express.urlencoded);

app.use(bodyParser.json());
app.use(cors());
app.use(router);
// connectToDatabase();

mongoose.connect(process.env.MONOGOURL).then(() => console.log('Database connected'))
    
app.listen(port, () => console.log(`Server is ruuning on port localhost: ${port}`))

