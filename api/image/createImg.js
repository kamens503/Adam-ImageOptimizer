const optimizeImg = require("./optimizeImg");

module.exports = async function createImg ({
    imgId,
    productId,
    productName,
    verName,
    lineName,
    index,
    versionId,
}) {
    const name = `${lineName}_${productName}_${verName ? verName + '_' : ''}${index}`
    const img = await optimizeImg({ imgId, name, productId, versionId, index })
    return img;
};
