import { useEffect, useRef } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import NoPage from "./pages/NoPage";
import EmergencyContact from "./pages/EmergencyContact";
import FAQ from "./pages/FAQ";
import UserProfile from "./pages/UserProfile";
import BorderPage from "./pages/BorderPage";

function App() {
  const socket = useRef(null);

  useEffect(() => {
    if (!socket.current) {
      socket.current = new WebSocket("ws://localhost:5000");
      socket.current.addEventListener("open", function (event) {
        console.log("Server connected | WS");
      });
      socket.current.addEventListener("message", function (event) {
        if(/\d/.test(event.data)) {
          const str = event.data;
          const numbers = str.match(/\d+/g);
          console.log("Server response", numbers);
        }
        else {
          console.log("Server response", event.data);
        }
        
      });
      socket.current.onopen = (event) => {
        socket.current.send("here's some text");
      };
    } else {
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<LogIn />} />
          <Route path="/home/:userid" element={<Home value={socket} />} />
          <Route path="/userprofile/:userid" element={<UserProfile />} />
          <Route
            path="/emergencycontact/:userid"
            element={<EmergencyContact />}
          />
          <Route path="/borderpage/:borderid" element={<BorderPage />} />
          <Route path="/faq/:userid" element={<FAQ />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
