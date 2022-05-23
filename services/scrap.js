var cheerio = require('cheerio');
var axios = require('axios');
var UrlModel = require('../models/scrap');
var ImagesModel = require('../models/image');
var VideosModel = require('../models/video');
var isAbsoluteUrl = require('is-absolute-url');


const scrapData = async (url) => {
  return new Promise(async (resolve, reject)=>{
      try {
          const urlFromDb = await UrlModel.findOrCreate({
              where: {
                  url: url
              }
          })
          const urlId = urlFromDb[0].id
          const {data} = await axios.get(url);
          const $ = cheerio.load(data);
          const images = $("img");
          const videos = $("video");

          images.each(async (indx, el) => {
              const src = $(el).attr('src');
              let imageUrl = '';
              if(!isAbsoluteUrl(src)) {
                  if(src.split('')[0] === '/') {
                      imageUrl = url+src;
                  }
                  else {
                      imageUrl = url+ '/' + src;
                  }

              } else {
                  imageUrl = src;
              }
              await ImagesModel.create({
                  url: imageUrl,
                  urlId: urlId
              })
          });

          videos.each(async (indx, el) => {
              const src = $(el).attr('src');
              let videoUrl = '';
              if(!isAbsoluteUrl(src)) {
                  videoUrl = url+src;
              } else {
                  videoUrl = src;
              }
              await VideosModel.create({
                  url: videoUrl,
                  urlId: urlId
              })
          });
          resolve('done');
      }
      catch (err) {
       reject(err)
      }
  })


}

module.exports = scrapData;
