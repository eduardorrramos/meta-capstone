import { useEffect, useState } from 'react';
import './Home.css'
import Header from '../components/header';
import {useNavigate, useParams} from 'react-router-dom'

function Home() {
    const [readyData, setReadyData] = useState([]);
    const navigate = useNavigate()
    const params = useParams();
    const variable = params.otherid

    async function getBorderData() {
        const response = await (async () => {
            return fetch('http://localhost:5000/borderdata');
        }) (); 
        const data = await response.json();
        console.log(data)
        return data;
    }

    useEffect(() => {
        getBorderData().then(data => {
            setReadyData(data)
        })
        }, []); 

        /*
          const loadBorderInfo = (readyData) => {
        let allMyBorders = []
        for (let i = 0; i < readyData.length; i++) {
        allMyBorders.push(
            <div key={i} className='border' onClick={() => crossingClick(i)}>
        <div>{i}</div>
        <div>{readyData[i].title[0]}</div>
        <div>{parseDescription(readyData[i].description[0]._)}</div>
            </div>  )
        }
        setAllBorders(allMyBorders)
        console.log(allBorders)
    }
    */

    const parseDescription = (item) => {
        const firstsplit = item.split(/(?=Date)/);
        const hours = firstsplit[0]
        const rest = firstsplit[1]
        const maxindex = rest.indexOf('Maximum Lanes');
        const date = rest.substr(0, maxindex);
        const rest2 = rest.substr(maxindex, rest.length);

        const genlaneindex = rest2.indexOf('General Lanes');
        const maxlanes = rest2.substr(0, genlaneindex);
        const rest3 = rest2.substr(genlaneindex, rest2.length);

        const fastlaneindex = rest3.indexOf('Fast Lanes');
        const genlanes = rest3.substr(0, fastlaneindex);
        const rest4 = rest3.substr(fastlaneindex, rest3.length);

        const max2laneindex = rest4.indexOf('Maximum Lanes');
        const max2lane = rest4.substr(0, max2laneindex);
        const rest5 = rest4.substr(max2laneindex, rest4.length);

        const gen2laneindex = rest5.indexOf('General Lanes');
        const max3lane = rest5.substr(0, gen2laneindex);
        const rest6 = rest5.substr(gen2laneindex, rest5.length);

        const sentrilaneindex = rest6.indexOf('Sentri Lanes');
        const gen2lane = rest6.substr(0, sentrilaneindex);
        const rest7 = rest6.substr(sentrilaneindex, rest6.length);

        const readylaneindex = rest7.indexOf('Ready Lanes');
        const sentrilane = rest7.substr(0, readylaneindex);
        const rest8 = rest7.substr(readylaneindex, rest7.length);

        const max3laneindex = rest8.indexOf('Maximum Lanes');
        const ready2lane = rest8.substr(0, max3laneindex);
        const rest9 = rest8.substr(max3laneindex, rest8.length);

        const gen3laneindex = rest9.indexOf('General Lanes');
        const gen3lane = rest9.substr(0, gen3laneindex);
        const rest10 = rest9.substr(gen3laneindex, rest9.length);

        const lastready = rest10.indexOf('Ready Lanes');
        const lastgenlane = rest10.substr(0, lastready);
        const rest11 = rest10.substr(lastready, rest10.length);
        // continue here ?????
        return (
            <div>
            <div>{hours}</div>
            <div>{maxlanes}</div>
            <div>{genlanes}</div>
            </div>
        )
    }
    // const allborders = document.getElementsByClassName('border');
    const crossingClick = (item) => {
        navigate(`/borderpage/${item}`)
        return (
            <></>
        )
    }
      
    return (
    <div className="container">
        <Header variable={variable}/>
        <h1> Crossing Display</h1>
            <div className="everythinginside">
            {readyData.map((item, index) => (
                <div key={index} className='border' onClick={() => crossingClick(index)}>
            <div>{index}</div>
            <div>{item.title[0]}</div>
            <div>{parseDescription(item.description[0]._)}</div>
                </div>
            ))}
            </div>
    </div>
    )
}
export default Home