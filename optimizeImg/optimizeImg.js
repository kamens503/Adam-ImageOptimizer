const tinify = require('tinify');
const path = require('path');
const fs = require('fs');
tinify.key = 'Zt3MxXYzJp1Yfm6QlwfHnd6jQglnwGQx';

module.exports = async function optimizeImg (query, url) {
    const { id, version, category, line, product, index } = query;
    const root = 'public/'
    const folder = `imgs/${category}/${line || 'unique'}/`;
    console.log({ root, folder });
    if (!fs.existsSync(path.resolve(root, folder))) {
        fs.mkdirSync(path.resolve(root, folder), { recursive: true });
    }
    const img = `${product}_${version ? version + '_' : ''}${index}_pdf.png`;
    const imgUrl = folder + img;
    if (fs.existsSync(path.join(root, imgUrl))) {
        return `https://${url}/${imgUrl}`;
    }
    const source = tinify.fromUrl(
        'https://drive.google.com/uc?export=view&id=' + id
    );
    const resized = source.resize({
        method: 'fit',
        width: 600,
        height: 500,
    });
    await resized.toFile(path.resolve(root, imgUrl)).then((r) => {
        console.log('Image saved & Optimized');
    });
    return `https://${url}/${imgUrl}`;
}
