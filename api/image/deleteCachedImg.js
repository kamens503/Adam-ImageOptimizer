const client = require('../sanityClient')

module.exports = async function deleteCachedImg (id) {
    try {
        const response = await client.delete(id)
        console.log('Cache Image deleted', response);
        return response
    } catch (e) {
        console.error(e);
    }
}
