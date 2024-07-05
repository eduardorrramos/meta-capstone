import { useEffect, useState } from 'react';
import { parseString } from 'xml2js';
import './Home.css'

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
        <> 
        <h1>Home: Testing Application</h1>
        {readyData.map(item => (
            <div className='border'>
        <div>{item.title[0]}</div>
        <div>{item.description[0]._}</div>
        <div>{item.link[0]}</div>
        <div>{item.pubDate[0]}</div>
        <div>{item.guid[0]}</div>

        </div>
      ))}
        </>
    );
}
export default Home