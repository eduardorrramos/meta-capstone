import Header from "../components/header"
import { useParams} from 'react-router-dom'
import { useState, useEffect } from "react";
import './BorderPage.css'

function BorderPage() {
    const borderindex = useParams();
    const actualborderindex = borderindex.id
    const specificBorderPosts = []
    const [allComments, setAllComments] = useState([])
    const [crossingData, setCrossingData] = useState([]);
    const [postData, setPostData] = useState({
        userId:"",
        borderNum: actualborderindex,
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
        for (const item of data) {
            if (item.borderNum == actualborderindex) {
                specificBorderPosts.push(item)
                // also need to match user id
            }
        }
        setAllComments(specificBorderPosts)
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
    const thisborder = crossingData[actualborderindex]; 
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
        <form onSubmit= {(e) => submit(e)}>
            <input onChange={(e)=>handle(e)} id="userId" value = {postData.userId} placeholder="userId"></input>
            <input onChange={(e)=>handle(e)} id="userInput" value = {postData.userInput} placeholder="userInput"></input>
            <button>Submit </button>
        </form>
        {allComments.map((item, index) => (
            <div key={index} className='border'>
            <div>{item.userInput}</div>
            <div>{item.borderNum}</div>
            {/* <div>{parseDescription(item.desscription[0]._)}</div> */}
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