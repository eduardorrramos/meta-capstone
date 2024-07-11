import Header from "../components/header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Logout from "../components/logout";

function UserProfile() {
  const [userData, setUserData] = useState([]);
  const params = useParams();
  const userid = params.userid;

  const fetchUserData = async () => {
    await fetch("http://localhost:5000/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("error", error);
      });
  };
  let userIndex = 0;
  for (const item in userData) {
    if (userData[item].googleId == userid) {
      userIndex = item;
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  if (userData.length > 0) {
    return (
      <div>
        <Header variable={userid} />
        <h1>User Profile</h1>
        <div className="border">
          <img id="image" src={userData[userIndex].imgUrl} alt="Image" />
          <h2 id="name"> {userData[userIndex].name}</h2>
          <h2 id="googleid"> {userData[userIndex].googleId}</h2>
          <h2 id="email"> {userData[userIndex].email}</h2>
        </div>
        <Logout />
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}
export default UserProfile;
