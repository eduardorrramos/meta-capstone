import Header from "../components/header"
import { useParams} from 'react-router-dom'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import { useState, useEffect } from "react";

function BorderPage() {
    const id = useParams();
    const actualid = id.id
    console.log(actualid)

    const [crossingData, setCrossingData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/borderdata')
        .then(response => response.json())
        .then(data => {
            setCrossingData(data)
        })
        }, []);
    console.log(crossingData[0])
    const thisborder = crossingData[actualid]; 
    console.log(thisborder)
    // console.log(thisborder.title[0])
        if (crossingData.length > 0) {
    return (
        <div>
            <Header/>
            <div>yay border </div>
            <div>{thisborder.title[0]}</div>
            <div>{thisborder.pubDate[0]}</div>
            <div>{thisborder.link[0]}</div>

            </div>
    ); }
    else {
        return <div>Loading... </div>
    }
}

export default BorderPage