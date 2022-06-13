require('dotenv').config();

const createImg = require('./createImg');
const cleanString = require('../utils/cleanString');
const queryImgs = require('./queryImgs');
const deleteCachedImg = require('./deleteCachedImg');

module.exports = async function routeImage (req, res) {
    const { body } = req;
    if (!body.productId) {
        res.end('No passing arguments or missing productId').status(400);
    }
    const {
        productId,
        versionId,
        deleteCache,
        imgIds,
        productName,
        versionName,
        lineName,
    } = body;

    const cachedImgs = await queryImgs(productId, versionId);
    let imgs = cachedImgs || [];
    if (deleteCache && imgs.length) {
        console.log('Deleting Caché');
        cachedImgs.id.forEach(async (id) => {
            await deleteCachedImg(id);
        });
        imgs = [];
    }
    // console.log(`DeleteCached is ${deleteCache}, Query images:`, imgs);
    console.log({ imgsL: imgs?.url?.length, imgIdL: imgIds.length });
    if (imgs?.url?.length >= imgIds.length) {
        console.log('Using cache');
        res.status(200).send(imgs.url)
        return
    }
    await imgIds.forEach(async (imgId, i) => {
        console.log('looping');
        if (!imgs?.url?.[i]) {
            await createImg({
                imgId,
                productName: cleanString(productName),
                verName: cleanString(versionName),
                lineName: cleanString(lineName),
                index: i,
                versionId,
                productId,
            })
        }
    });

    try {
        const response = await queryImgs(productId, versionId);
        console.log("Final block", response.url);
        res.status(200).send(response.url);
    } catch (e) {
        res.status(500).send('Somethign went wrong', e)
    }

    // queryImgs(productId, versionId).then(response => {
    //     console.log(response.url);
    //     res.send(response.url).status(200);
    // })
};
