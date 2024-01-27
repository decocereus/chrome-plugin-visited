import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState<any | []>([]);
  useEffect(() => {
    const getCurrentUser = async () => {
      // This will send a req to the frontend, which proxies over to the backend, and that way I can share the user between frontend and ext
      let response = await axios.get(
        "http://localhost:3000/auth/getCurrentUser"
      );
      console.log(response.data);
      setUser(response.data);
    };
    getCurrentUser();
  }, []);
  return <div className="App">Hello World</div>;
}

export default App;
