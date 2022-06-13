require('dotenv').config();
const sanityClient = require('@sanity/client');

const config = {
    projectId: process.env.PROJECT_ID,
    dataset: 'production',
    apiVersion: '2021-08-29',
    token: process.env.TOKEN,
};
module.exports = sanityClient(config);
