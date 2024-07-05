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

    const fetchCrossingData = () => {
        fetch('https://bwt.cbp.gov/xml/bwt.xml')
        .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log(response.json);
            return response.json();
          })
          .then(data => {
            setCrossingData(data)
          })
          .catch(error => {
            console.error(`Error fetching data: `, error);
          });
    }

    return (
<>
<Header/>

        <h1>Home: Testing Application</h1>
        <h1>Border Crossing Display</h1>
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
    )
}
export default Home