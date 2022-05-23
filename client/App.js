import React, { useEffect, useState } from "react";
import "./antd.css";
import "./global.css";
import Header from "./components/Header";
import Loader from './components/Loader';
import FetchUrl from "./components/FetchUrl";
import Scrapped from "./components/Scrapped";
import ScrappedData from './components/ScrappedData';
import {Card} from "antd";

const App = ({ title }) => {
  const [id, setId] = useState(1)

  useEffect(()=>{
  }, []);

  return (
    <div>
      <Header/>
        <div className="layout-container">
          <FetchUrl/>
          <Card className='already-scrapped'>
          <h1> Already Scrapped</h1>
          <Scrapped setId={setId}/>
          <ScrappedData id={id}/>
          </Card>
        </div>
    </div>
  );
};

export default App;
