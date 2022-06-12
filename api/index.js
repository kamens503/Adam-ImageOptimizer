const express = require('express');
const app = express();
const PORT = process.env.PORT || 8081;
const optimizeImg = require('./optimizeImg/optimizeImg')
const cleanStrign = require('./utils/cleanString')

const cors = require('cors');
app.use(cors());

app.use(express.static('public'));
app.get('/', async (req, res) => {
    if (!req.query.category) {
        res.send('No passing arguments or missin cateogry').status(400);
        return;
    }
    const query = {};
    Object.keys(req.query).forEach((i) => {
        query[i] = cleanStrign(req.query[i]);
    });
    console.log('GETTING', { query: req.query });
    const img = await optimizeImg(query, req.get('host'));
    console.log(req.get('host'));
    res.send(img).status(200);
});

app.listen(PORT, () => {
console.log('Running localhost', PORT);
});

module.exports = app;
