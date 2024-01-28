import React, { useState, useEffect } from "react";
import { getCurrentUser, logoutCurrentUser } from "../utils/apiCalls";
import "./Home.css";

const Home = () => {
  const [user, setUser] = useState(null);

  const fetchCurrentUser = async () => {
    // This will send a req to the frontend, which proxies over to the backend, and that way I can share the user between frontend and ext
    let response = await getCurrentUser();
    let googleId = response.googleid;
    chrome.runtime.sendMessage({ type: "authUser", googleId });
    setUser(response);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const handleLogin = () => {
    chrome.tabs.create({
      url: "https://visited-client.vercel.app/auth/google",
      selected: true,
      active: true,
    });
  };

  const handleLogout = async () => {
    let isLoggedOut = await logoutCurrentUser();
    if (isLoggedOut) window.location.reload();
    else alert("Logout unsuccessful");
  };

  return (
    <div className="home-container">
      {user ? (
        <div className="heading-btn-container">
          <h3>Status: Logged In</h3>
          <button className="auth-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h3 className="heading-btn-container">Status: Not Logged In</h3>
          <button className="auth-button" onClick={handleLogin}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
