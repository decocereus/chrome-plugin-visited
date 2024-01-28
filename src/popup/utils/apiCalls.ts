import axios from "axios";

export const getCurrentUser = async () => {
  try {
    let response = await axios.get("http://localhost:3000/auth/getCurrentUser");
    console.log("Current user: ", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const logoutCurrentUser = async () => {
  try {
    let response = await axios.get("http://localhost:3000/auth/logout");
    console.log("Current user: ", response.data);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
