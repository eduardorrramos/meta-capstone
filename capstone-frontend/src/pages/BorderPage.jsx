import Header from "../components/header"
import { useParams} from 'react-router-dom'
import { useState, useEffect } from "react";
import './BorderPage.css'
function BorderPage() {
    const [crossingData, setCrossingData] = useState([]);

    const id = useParams();
    const actualid = id.id
// make function inside useeffect async? const fetchData = async () => {}
    useEffect(() => {
        fetch('http://localhost:5000/borderdata')
        .then(response => response.json())
        .then(data => {
            setCrossingData(data)
        })
    }, []);
    const thisborder = crossingData[actualid]; 
    
    if (crossingData.length > 0) {
        return (
            <div >
            <Header/>
            <div>yay border </div>
                <div className='border'>
                <div>{thisborder.title[0]}</div>
                <div>{thisborder.pubDate[0]}</div>

                <div>{thisborder.link[0]}</div>
                </div>
            </div>
        );
    }
    else {
        return <div>Loading... </div>
    }
}
export default BorderPage