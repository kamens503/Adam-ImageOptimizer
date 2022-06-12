const express = require('express');
const app = express();
const PORT = process.env.PORT || 8081;

app.get('/', (req, res) => {
    res.send('Use /api to optimize images')
});

app.listen(PORT, () => {
console.log('Running localhost', PORT);
});

module.exports = app;
