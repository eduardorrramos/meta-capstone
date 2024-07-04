import { useEffect, useState } from 'react';
import { parseString } from 'xml2js';


function Home() {
    const [readyData, setReadyData] = useState([]);


useEffect(() => {
    fetch('http://localhost:5000/borderdata')
    .then(response => response.json())
    .then(data => {
        setReadyData(data)
        data.forEach(crossing =>{
            console.log(crossing.title[0])
        })

    })
    }, []); 
     

      


    return (
        <> 
        <h1>Home: Testing Application</h1>
        {readyData.map(item => (
        <div>{item.title[0]}</div>
      ))}
        </>
    );
}
export default Home