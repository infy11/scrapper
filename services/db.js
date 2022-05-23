
const  UrlModel  = require('../models/scrap');
const ImagesModel = require('../models/image');
const VideosModel = require('../models/video');

const getAllUrls = () => {
    return UrlModel.findAll()
}

const getImagesForUrl = (id) => {
    return ImagesModel.findAll({
        where: {
            urlId: id,
        }
    })
}

const getVideosForUrl = (id) => {
    return VideosModel.findAll({
        where: {
            urlId: id,
        }
    })
}



module.exports = {
    getAllUrls,
    getImagesForUrl,
    getVideosForUrl
}
