require('dotenv').config();
const sanityClient = require('@sanity/client');

const config = {
    projectId: process.env.PROJECT_ID,
    dataset: 'production',
    apiVersion: '2021-08-29',
    token: process.env.TOKEN,
};
const client = sanityClient(config);

const short = require('short-uuid');

module.exports = async function saveImg (imgProps) {
    const { data, productId, versionId, name, index } = imgProps;
    let field;
    let setField;
    console.log(versionId);
    // Version Id is set to -1 if there's no version queried
    if (versionId < 0) {
        setField = { pdfImgReady: [] };
        // setField.pdfImgReady[index] = {};
        // field = `pdfImgReady[${index}]`;
        field = 'pdfImgReady'
    } else {
        setField = { 'versions[0]': { pdfImgReady: [] } };
        // setField.versions.pdfImgReady[index] = {};
        field = 'versions[0].pdfImgReady'
        // field = `versions[${versionId}].pdfImgReady[${index}]`;
    }

    const key = short.generate();
    console.log({ setField, field, index, key });

    try {
        const imageAsset = await client.assets.upload('image', data, {
            filename: name,
        });
        const response = await client
            .patch(productId)
            .setIfMissing(setField)
            .append(field, [
                {
                    _key: key,
                    _type: 'img',
                    asset: { _type: 'reference', _ref: imageAsset._id },
                },
            ])
            .commit();
        console.log('Image Saved!', response);
    } catch (e) {
        console.error('Cache image save failed ', e);
    }
};
