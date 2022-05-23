const Scrap = require('./scrap');
const Video =  require('./video');
const Image = require('./image');


const makeAssosiations  = () => {
    Url.hasMany(Image);
    Url.hasMany(Video);
    Video.belongsTo(Scrap);
    Image.belongsTo(Scrap)
}

module.exports = makeAssosiations;
