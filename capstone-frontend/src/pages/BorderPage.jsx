import Header from "../components/header"
import { useParams} from 'react-router-dom'
import { useState, useEffect, act } from "react";
import './BorderPage.css'

function BorderPage() {
    const borderindex = useParams();
    const actualborderindex = borderindex.id
    let specificBorderPosts = []
    const [crossingData, setCrossingData] = useState([]);
    const [postData, setPostData] = useState({
        userId:"",
        borderNum: parseInt(actualborderindex),
        userInput:""
    })

    function handle(e){
        const newdata= {...postData}
        newdata[e.target.id]=e.target.value
        setPostData(newdata)
    }
    function submit(e){
        e.preventDefault();
        fetch('http://localhost:5000/usersposts', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:5000/usersposts"
          },
          body: JSON.stringify(postData)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    }

    function fetchComments() {
        fetch('http://localhost:5000/usersposts')
        .then(response => response.json())
        .then(data => {
            specificBorderPosts = []
            for (const item of data) {
                if (data[item].borderNum == actualborderindex) {
                    specificBorderPosts.push(data[item])
                    // also need to match user id
                }
            }
        })
    }
// make function inside useeffect async? const fetchData = async () => {}
    useEffect(() => {
        fetchComments()
        fetch('http://localhost:5000/borderdata')
        .then(response => response.json())
        .then(data => {
            setCrossingData(data)
        })
    }, []);
    //IF PASS IN ITEM INSTEAD OF INDEX DONT HAVE TO FETCH DATA
    //BUT THEN NEED INDEX FOR COMMENTS TOO, 
    const thisborder = crossingData.allMexicanPorts[actualborderindex]; 
    console.log(thisborder)

    if (crossingData.length > 0) {
        return (
            <div >
            <Header/>
            <div>yay border </div>
            <div className='border'>
                <div>{thisborder.border[0]}</div>
                <div>{thisborder.borderRegion[0]}</div>
                <div>{thisborder.crossingName[0]}</div>
                <div>{thisborder.hours[0]}</div>
                <div>{thisborder.passengerVehicleWait[0]}</div>
                <div>{thisborder.pedestrianLaneWait[0]}</div>
                <div>{thisborder.portStatus[0]}</div>
            </div>
            <form onSubmit= {(e) => submit(e)}>
                <input onChange={(e)=>handle(e)} id="userId" value = {postData.userId} placeholder="userId"></input>
                <input onChange={(e)=>handle(e)} id="userInput" value = {postData.userInput} placeholder="userInput"></input>
                <button>Submit </button>
            </form>
            {specificBorderPosts.map((item, index) => (
                <div key={index} className='border'>
                <div>{item.userInput}</div>
                <div>{item.borderNum}</div>
                </div>
                ))}
            </div>
        );
    }
    else {
        return <div>Loading... </div>
    }
}
export default BorderPage