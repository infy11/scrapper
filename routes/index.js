var express = require('express');
var router = express.Router();
var scrap = require('../services/scrap');
const {getAllUrls, getImagesForUrl, getVideosForUrl} = require('../services/db')

/* GET home page. */
router.get('/scrap', function(req, res, next) {
  let url = req.query.url;
  console.log('req.user', req.user);
  if(!url) {
    next('no url found');
  }
  scrap(url).then(response=>{
   res.json(response);
  }).catch(err=>{
    next('error occurred',err);
  })

});

router.get('/getAllUrl', async (req, res, next) =>{
  const urls = await getAllUrls()

  res.json(urls);

});

router.get('/getImagesForUrl', async(req,res)=>{
  let id = req.query.id;
  try {
    const urls = await getImagesForUrl(id)
    res.json(urls);
  }
  catch (err) {
    console.log('error occured', err);
    res.json({err: err});
  }


})

router.get('/getVideosForUrl', async(req,res)=>{
  let id = req.query.id;
  try {
    const urls = await getVideosForUrl(id)
    res.json(urls);
  }
  catch (err) {
    console.log('error occured', err);
    res.json({err: err});
  }


})

module.exports = router;
