import Header from "../components/header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Logout from "../components/logout";
import ModalPopulate from "../components/modal";

function UserProfile() {
  const [userData, setUserData] = useState([]);
  const [comments, setComments] = useState([]);

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
    if (userData[item].email == userid) {
      userIndex = item;
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/usersposts")
      .then((response) => response.json())
      .then((data) => {
        let relevantComments = [];
        for (const item in data) {
          if (data[item].userId == userid) {
            relevantComments.push(data[item]);
          }
        }
        setComments(relevantComments);
      });
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
        {comments.map((item, index) => (
          <div key={index} className="border">
            <div>Border Crossing Index: {item.borderNum}</div>
            <div>{item.userInput}</div>
          </div>
        ))}
        <Logout />
        <ModalPopulate />
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}
export default UserProfile;
