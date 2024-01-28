import axios from "axios";
import { VisitedUrl } from "../lib/definitions";

export const getCurrentUser = async () => {
  try {
    let response = await axios.get("http://localhost:3000/auth/getCurrentUser");
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const logoutCurrentUser = async () => {
  try {
    let response = await axios.get("http://localhost:3000/auth/logout");
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const sendVisitedUrl = async ({ visitedUrl, googleId }: VisitedUrl) => {
  try {
    // Had to use fetch, there was an adapter issue with axios.
    const response = await fetch(
      "http://localhost:4500/api/v1/database/addVisitedURL",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ visitedUrl, googleId }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (err) {
    console.error(err);
  }
};
