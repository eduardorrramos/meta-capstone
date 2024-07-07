import Header from "../components/header"
import { useEffect, useState } from "react"
import {useParams} from 'react-router-dom'

function UserProfile() {
    const [userData, setUserData] = useState([]);
    const params = useParams();
    const firstvariable = params.thirdid

    const fetchUserData = async () => {
        await fetch('http://localhost:5000/users')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        return response.json();
        })
        .then(data => {
            setUserData(data).then(() => {
                console.log("data ready");
            });
        })
        .catch(error => {
            console.error('error', error);
        })
    }
    let index = 0;
    for (const thing in userData) {
        if (userData[thing].googleId == firstvariable) {
            index = thing;
            console.log(thing)
        }
    }
    // attempting to make return statement cleaner, working on this
    // function displayUser() {
    //     document.getElementById('name').innerText = userData[0].name
    //     document.getElementById('googleid').innerText = userData[0].googleId
    //     document.getElementById('email').innerText = userData[0].email
    // }
    useEffect(() => {
        fetchUserData()
        // displayUser();

    }, []);

    if (userData.length > 0) {
    return (
        <div>
            <Header variable={firstvariable}/>
            <h1>User Profile</h1>
                <div className="border">
                <img id="image" src={userData[index].imgUrl} alt="Image" />
                <h2 id="name"> {userData[index].name}</h2>
                <h2 id="googleid"> {userData[index].googleId}</h2>
                <h2 id="email"> {userData[index].email}</h2>

                </div>
        </div>
    ) }
    else {
    return (
        <div>Loading</div>
    )
    }
}
export default UserProfile