const tinify = require('tinify');
const fs = require('fs');
tinify.key = 'Zt3MxXYzJp1Yfm6QlwfHnd6jQglnwGQx';

export default async function optimizeImg (query, url) {
    const { id, version, category, line, product, index } = query;
    const folder = `imgs/${category}/${line || 'unique'}/`;
    if (!fs.existsSync('./public/' + folder)) {
        fs.mkdirSync('./public/' + folder, { recursive: true });
    }
    const img = `${product}_${version ? version + '_' : ''}${index}_pdf.png`;
    const imgUrl = folder + img;
    if (fs.existsSync('./public/' + imgUrl)) {
        return `http://${url}/${imgUrl}`;
    }
    const source = tinify.fromUrl(
        'https://drive.google.com/uc?export=view&id=' + id
    );
    const resized = source.resize({
        method: 'fit',
        width: 600,
        height: 500,
    });
    await resized.toFile('./public/' + imgUrl).then((r) => {
        console.log('Image saved & Optimized');
    });
    return `http://${url}/${imgUrl}`;
}
