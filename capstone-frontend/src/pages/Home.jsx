import { useEffect, useState } from 'react';
import './Home.css'
import Header from '../components/header';
import {useNavigate, useParams} from 'react-router-dom'

function Home() {
    const [readyData, setReadyData] = useState([]);
    const navigate = useNavigate()
    const params = useParams();
    const variable = params.otherid
    let allMexicanBorders = []
    let allCanadianBorders = []
// made the fetchData() async and used await in hopes of getting rid of delay in 
// rendering cards upon initial page load when the server is first started -> not functioning as expected
    useEffect(() => {
        async function fetchData() { 
            const response = await fetch('http://localhost:5000/borderdata')
            const json = await response.json()
            setReadyData(json) 
        }
        fetchData()
     }, []); 
    
    const loadBorderInfo = (information) => {
        allMexicanBorders = []
        allCanadianBorders = []
        for (const item in information.allMexicanPorts) {
            let currBorder = information.allMexicanPorts[item]
            allMexicanBorders.push(
                <div key={item} className='border' onClick={() => crossingClick(item)}>
                    <div>{item}</div>
                    <div>{currBorder.border[0]}</div>
                    <div>{currBorder.borderRegion[0]}</div>
                    <div>{currBorder.crossingName[0]}</div>
                    <div>{currBorder.hours[0]}</div>
                    <div>{currBorder.passengerVehicleWait[0]}</div>
                    <div>{currBorder.pedestrianLaneWait[0]}</div>
                    <div>{currBorder.portStatus[0]}</div>
                </div>
        )}
        for (const item in information.allCanadianPorts) {
            let currBorder = information.allCanadianPorts[item]
            console.log(currBorder)
            allCanadianBorders.push(
                <div key={item} className='border' onClick={() => crossingClick(item)}>
                    <div>{item}</div>
                    <div>{currBorder.border[0]}</div>
                    <div>{currBorder.borderRegion[0]}</div>
                    <div>{currBorder.crossingName[0]}</div>
                    <div>{currBorder.hours[0]}</div>
                    <div>{currBorder.passengerVehicleWait[0]}</div>
                    <div>{currBorder.pedestrianLaneWait[0]}</div>
                    <div>{currBorder.portStatus[0]}</div>
                </div>
        )}
    }
    
    loadBorderInfo(readyData)
    const crossingClick = (item) => {
        console.log(item)
        navigate(`/borderpage/${item}`)
    }

    return (
    <div className="container">
        <Header variable={variable}/>
        <h1> Crossing Display</h1>
        <div>Last Updated Date: {readyData.lastUpdatedDate}</div>
        <div>Last Updated Time: {readyData.lastUpdatedTime}</div>
        <div>Total Number of Ports: {readyData.numOfPorts}</div>
        <div className="mexicanBorders"> 
            Mexican Borders: {allMexicanBorders}
        </div>
        <div className="canadianBorders"> 
            Canadian Borders: {allCanadianBorders}
        </div>
     </div>
    )
}
export default Home