import Header from "../components/header";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./BorderPage.css";
import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

function BorderPage() {
  const borderObject = useParams();
  const borderIndex = borderObject.borderid;

  const [postData, setPostData] = useState({
    userId: "erramoseduardo@gmail.com",
    borderNum: "0",
    userInput: "",
  });

  const { data, error, isLoading } = useSWR(
    "http://localhost:5000/borderdata",
    fetcher
  );
  const {
    data: data2,
    error: error2,
    isLoading: isLoading2,
  } = useSWR("http://localhost:5000/usersposts", fetcher);

  const crossingData = data;
  const allComments = data2;

  useEffect(() => {
    if (allComments) {
    createCommentDisplays(allComments);
    }
  }, [allComments]);

  let allRelevantComments = []
  let populatedDivs = []
  function createCommentDisplays(specificBorderPosts) {
    allRelevantComments = []
    specificBorderPosts.forEach(element => {
        if (parseInt(element.borderNum) == borderIndex){
        allRelevantComments.push(
           element.userInput)
        }
    }    );
    populatedDivs = allRelevantComments.map(comment => (
        <div>{comment}</div>
    ))
}

  if (crossingData) {
    const thisBorder = crossingData.allMexicanPorts[borderIndex];
    return (
      <div>
        <Header />
        <div className="border">
          <div>{thisBorder.border}</div>
          <div>{thisBorder.borderRegion[0]}</div>
          <div>{thisBorder.crossingName[0]}</div>
          <div>{thisBorder.hours[0]}</div>
          <div>{thisBorder.passengerVehicleWait[0]}</div>
          <div>{thisBorder.pedestrianLaneWait[0]}</div>
          <div>{thisBorder.portStatus[0]}</div>
        </div>

        <form onSubmit={(input) => submit(input)}>
          <input
            onChange={(input) => handle(input)}
            id="userInput"
            value={postData.userInput}
            placeholder="userInput"
          ></input>
          <button>Post </button>
        </form>
        <div>
            populatedDivs.map({})
        {populatedDivs}
        </div>
        <div></div>
      </div>
    );
  } else {
    return <div>Loading... </div>;
  }
}
export default BorderPage;

// function handle(input) {
//     const newdata = { ...postData };
//     newdata[input.target.id] = input.target.value;
//     setPostData(newdata);
//   }
//   function submit(input) {
//     input.preventDefault();
//     fetch("http://localhost:5000/usersposts", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "http://localhost:5000/usersposts",
//       },
//       body: JSON.stringify(postData),
//     })
//       .then((response) => response.json())
//       .then((data) => console.log(data))
//       .catch((error) => console.error(error));
//   }
