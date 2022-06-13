const tinify = require('tinify');
const saveImg = require('./saveImg');
require('dotenv').config();
tinify.key = process.env.TINIFY_KEY;

module.exports = async function optimizeImg ({
    imgId,
    name,
    productId,
    versionId,
    index,
}) {
    const source = tinify.fromUrl(
        'https://drive.google.com/uc?export=view&id=' + imgId
    );
    const resized = source.resize({
        method: 'fit',
        width: 600,
        height: 500,
    });
    resized.toBuffer(async (e, data) => {
        try {
            await saveImg({ data, name, productId, versionId, index });
        } catch (e) {
            console.error('Image Optimizer Failed', e);
        }
    });
};
