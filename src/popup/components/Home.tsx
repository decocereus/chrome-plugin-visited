import { useState, useEffect } from "react";
import { logoutCurrentUser, getCurrentUser } from "../utils/apiCalls";
import "./Home.css";

const Home = () => {
  const [user, setUser] = useState(null);

  const fetchCurrentUserGoogleId = async () => {
    /**
     * Getting a creds which were stored when auth was initiated from the frontend and storing it in localstorage.
     */
    let response = await getCurrentUser();
    let googleId = response.googleid;
    chrome.runtime.sendMessage({ type: "authUser", googleId });
    setUser(response);
  };

  useEffect(() => {
    fetchCurrentUserGoogleId();
  }, []);

  const handleLogin = () => {
    chrome.tabs.create({
      url: "https://visited-server-backend.onrender.com/api/v1/auth/google",
      selected: true,
      active: true,
    });
  };

  const handleLogout = async () => {
    setUser(null);
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
