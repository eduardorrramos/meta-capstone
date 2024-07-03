import { useEffect, useState } from 'react';

function Home() {
    const [crossingData, setCrossingData] = useState([])
    useEffect(() => {
        fetchCrossingData();

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

        <h1>Home: Testing Application</h1>
        
    )
}
export default Home