import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import NoPage from "./pages/NoPage";
import FAQ from "./pages/FAQ";
import UserProfile from "./pages/UserProfile";
import BorderPage from "./pages/BorderPage";
import ApplicationContext from "./applicationContext";
import Bookmarked from "./pages/Bookmarked";
function App() {
  const socket = useRef(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const userName = sessionStorage.getItem("name");
  const userEmail = sessionStorage.getItem("email");
  const userImg = sessionStorage.getItem("image");
  const userId = sessionStorage.getItem("googleid");

  useEffect(() => {
    if (!socket.current) {
      socket.current = new WebSocket("ws://localhost:5000");
      socket.current.addEventListener("message", function (event) {
        if (/\d/.test(event.data)) {
          setIsOpen(true);
        }
      });
    }
  }, []);

  return (
    <ApplicationContext.Provider
      value={{
        modalIsOpen,
        setIsOpen,
        socket,
        userName,
        userEmail,
        userImg,
        userId,
      }}
    >
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<LogIn />} />
            <Route path="/home" element={<Home />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/bookmarked" element={<Bookmarked />} />
            <Route path="/borderpage/:borderid" element={<BorderPage />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ApplicationContext.Provider>
  );
}
export default App;
