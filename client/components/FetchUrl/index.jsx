import React, {useState} from 'react';
import {Input, Button, Card, notification} from "antd";
import {submitUrl} from "../../api/submitUrl";
import './style.css'

function FetchUrl() {

    const [url, setUrl] = useState('');
    const handleFetchUrl = () => {
        submitUrl(url).then(res=>{
            notification.success({
                message: 'Url Submitted',
                description: 'request has been submitted it might take some time to reflect the data'
            })
            setUrl('');
        })
    }
    return (
        <div className='fetch-url-wrapper'>

         <Card className='fetch-url-card'>
             <h1> Scrap new Url</h1>
             <br/>
        <Input placeholder={'url'} onChange={(e)=> setUrl(e.target.value)} value={url}/>
        <Button onClick={handleFetchUrl} type='primary' className='primary-button'> Fetch images and videos</Button>
         </Card>
        </div>


    )
}

export default FetchUrl;
