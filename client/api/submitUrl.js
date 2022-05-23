import client from './client';

export const submitUrl = (url) => {
    return  client.get(`/scrap?url=${url}`);
}



