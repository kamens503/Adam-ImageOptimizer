const path = require('path')
require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
});
const express = require('express');
const app = express();
const routeImage = require('./image/routeImage')
const PORT = process.env.PORT || 8081;

if (!process.env.VERCEL) {
    app.use(
        express.urlencoded({
            extended: true,
        })
    );
    app.use(express.json());
}

const cors = require('cors');
app.use(cors());

app.post('/api/image', routeImage);
app.post('/api/', routeImage);

app.listen(PORT, () => {
    console.log('Running localhost', PORT);
});

module.exports = app;
