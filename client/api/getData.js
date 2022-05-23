import client from './client';

export const getAllUrls = () => {
   return  client.get('/getAllUrl');
}


export const getImagesForUrl = (id) => {
   return  client.get(`/getImagesForUrl?id=${id}`);
}

export const getVideosForUrl = (id) => {
   return  client.get(`/getVideosForUrl?id=${id}`);
}

