const client = require('../sanityClient');

module.exports = async function queryImgs(productId, versionId) {
    const imgUrl =
        versionId < 0
            ? `pdfImgReady[].asset->url`
            : `versions[${versionId}].pdfImgReady[].asset->url`;
    const imgId =
        versionId < 0
            ? `pdfImgReady[].asset->_id`
            : `versions[${versionId}].pdfImgReady[].asset->_id`;
    const query = `*[_type == "product" && _id=="${productId}"] {"imgs":{ "url": ${imgUrl}, "id": ${imgId}} }`;
    try {
        const response = await client.fetch(query);
        console.log('Quering images', response);
        return response[0].imgs;
    } catch (e) {
        console.error('Image query failed', e);
    }
};
