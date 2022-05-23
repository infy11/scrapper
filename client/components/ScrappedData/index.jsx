import React, {useEffect, useState} from 'react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import {getImagesForUrl} from "../../api/getData";
import {getVideosForUrl} from "../../api/getData";


const onChange = (key) => {
    console.log(key);
};

const ScrappedData = ({id}) => {
    console.log('scrapped data id', id);
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    useEffect(() => {
         getImagesForUrl(id).then(res=>{
             console.log(res);
             setImages(res.data);
         }).catch(err=>{
             setImages([]);
         })
        getVideosForUrl(id).then(res=>{
            console.log(res);
            setVideos(res.data);
        }).catch(err=>{
            setVideos([]);
        })
    }, [id]);
    return (


    <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="Images" key="1">
            {
                images.map(image=>(
                    <div> {image.url} </div>
                ))
            }
        </TabPane>
        <TabPane tab="Videos" key="2">
            {
                videos.map(video=>(
                    <div> video.url </div>
                ))
            }
        </TabPane>
    </Tabs>
)
}

export default ScrappedData;
