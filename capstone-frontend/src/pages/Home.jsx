import { useEffect, useState } from 'react';
import Header from '../components/header';

function Home() {
    // const [crossingData, setCrossingData] = useState([])
    // useEffect(() => {
    //     fetchCrossingData();
    // }, []);

    // const fetchCrossingData = () => {
    //     let url = 'https://bwt.cbp.gov/xml/bwt.xml';
    //     fetch(url)
    //     .then(response => {
    //         if (!response.ok) {
    //           throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    //         return response.text();
    //       })
    //       .then(data => {
    //         //DOMParser attempted to do text instead of json because of XML
    //         let parses = new DOMParser();
    //         const xmldocument = new DOMParser().parseFromString(data, 
    //             "text/xml");
    //         const crossings = xmldocument.querySelectorAll("border");
    //         for (const crossing of crossings) {
    //             console.log(crossing);
    //         }
    //         // setCrossingData(data)
    //       })
    //       .catch(error => {
    //         console.error(`Error fetching data: `, error);
    //       }); 
    // };

    return (
        <>
        <Header/>
        <h1>Border Crossing Display</h1>
        </>
    )
}
export default Home