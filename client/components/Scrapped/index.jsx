import React, {useState, useEffect} from 'react';
import { AutoComplete } from 'antd';
import {getAllUrls} from "../../api/getData";

const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
});

function Scrapped({setId}) {
    const [value, setValue] = useState('');
    const [options, setOptions] = useState([]);

    useEffect(()=>{
        getAllUrls().then(res=>{

            const urls = res.data.map(item=> {return  {value :item.id, label: item.url}});
            console.log('urls', urls)
            setOptions(urls)
        })
    },[])

    const onSearch = (searchText) => {
    };

    const onSelect = (data) => {
        console.log('onSelect', data);
        setId(data)
    };

    const onChange = (data) => {
        setValue(data);

    };

    return (
        <>
            <br />
            <AutoComplete
                value={value}
                options={options}
                style={{ width: 200 }}
                onSelect={onSelect}
                onSearch={onSearch}
                onChange={onChange}
                placeholder="search url"
            />
        </>
    );
}

export default Scrapped;
