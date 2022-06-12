const express = require('express');
const app = express();
const PORT = process.env.PORT || 8081;
const tinify = require('tinify');
const fs = require('fs');
const cors = require('cors');
tinify.key = 'Zt3MxXYzJp1Yfm6QlwfHnd6jQglnwGQx';
app.use(cors());

function cleanStrigns(str) {
	const noSpaces = str.split(' ').join('_');
	const noEspecialCharacters = noSpaces
		.replace(/[|&;$%@"<>()+,/]/g, '')
		.split(' ')
		.join('_');
	const noAccents = noEspecialCharacters
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '');
	return noAccents;
}

async function optimizeImg(query, url) {
	const { id, version, category, line, product, index } = query;
	const folder = `imgs/${category}/${line || 'unique'}/`;
	if (!fs.existsSync('./public/' + folder)) {
		fs.mkdirSync('./public/' + folder, { recursive: true });
	}
	const img = `${product}_${version ? version +'_' : '' }${index}_pdf.png`;
	const img_url = folder + img;
	if (fs.existsSync('./public/' + img_url)) {
		return `http://${url}/${img_url}`;
	}
	const source = tinify.fromUrl(
		'https://drive.google.com/uc?export=view&id=' + id
	);
	const resized = source.resize({
		method: 'fit',
		width: 600,
		height: 500,
	});
	await resized.toFile('./public/' + img_url).then((r) => {
		console.log('Image saved & Optimized');
	});
	return `http://${url}/${img_url}`;
}
app.use(express.static('public'));
app.get('/', async (req, res) => {
	const query = {};
	Object.keys(req.query).forEach((i) => {
		query[i] = cleanStrigns(req.query[i]);
	});
	console.log('GETTING');
	const img = await optimizeImg(query, req.get('host'));
	console.log(req.get('host'));
	res.send(img).status(200);
});

app.listen(PORT, () => {
	console.log('Running localhost', PORT);
});
