import { useEffect, useRef , createContext, useContext, useState} from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import NoPage from "./pages/NoPage";
import EmergencyContact from "./pages/EmergencyContact";
import FAQ from "./pages/FAQ";
import UserProfile from "./pages/UserProfile";
import BorderPage from "./pages/BorderPage";
import ApplicationContext from "./applicationContext";



function App() {

  const socket = useRef(null);
  const [modalIsOpen, setIsOpen] = useState(false);

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
          setIsOpen(true);
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
    <ApplicationContext.Provider value={{modalIsOpen, setIsOpen, socket}}>
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<LogIn />} />
          <Route path="/home/:userid" element={<Home/>} />
          <Route path="/userprofile/:userid" element={<UserProfile />} />
          <Route
            path="/emergencycontact/:userid"
            element={<EmergencyContact />}
          />
          <Route path="/borderpage/:borderid/:userid" element={<BorderPage />} />
          <Route path="/faq/:userid" element={<FAQ />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
    </ApplicationContext.Provider>
  );
  
}
export default App;
