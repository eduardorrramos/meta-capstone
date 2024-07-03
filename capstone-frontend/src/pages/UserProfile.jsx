import Header from "../components/header"
import { useEffect, useState } from "react"

function UserProfile() {

    const [userData, setUserData] = useState([]);
    

    const fetchUserData = () => {
        fetch('http://localhost:5000/users')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        return response.json();
        })
        .then(data => {
            setUserData(data);
        })
        .catch(error => {
            console.error('error', error);
        })
    }
    useEffect(() => {
        fetchUserData();
    }, []);

    // const name = userData[0].name;
    // const gid = userData[0].googleId;
    // const email = userData[0].email;
    // const image = userData[0].imgUrl;

    console.log(userData)
    console.log(userData);
    return (
        <>
        <Header/>
        <h1>User Profile</h1>
        {/* <h2>{name}</h2>
        <h2>{gid}</h2>
        <h2>{email}</h2>
        <h2>{image}</h2> */}

        </>
    )
}
export default UserProfile