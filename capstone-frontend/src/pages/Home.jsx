import { useEffect, useState } from 'react';
import { parseString } from 'xml2js';
import './Home.css'
import Header from '../components/header';

function Home() {
    const [readyData, setReadyData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/borderdata')
        .then(response => response.json())
        .then(data => {
            setReadyData(data)
            data.forEach(crossing =>{
                // console.log(crossing.title[0])
            })
    
        })
        }, []); 


    return (

    <div className="container">
        <Header/>

        <h1>Home: Testing Application</h1>
        <h1>Border Crossing Display</h1>
        <div className="everythinginside">

        {readyData.map(item => (
            <div className='border'>
        <div>{item.title[0]}</div>
        <div>{item.description[0]._}</div>
        <div>{item.link[0]}</div>
        <div>{item.pubDate[0]}</div>
        <div>{item.guid[0]}</div>
            </div>
      ))}
      </div>
      

    </div>
    )
}
export default Home