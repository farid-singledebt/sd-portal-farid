import axios from "axios";
import React, { createContext, useState } from "react";
const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const url = "https://api.singledebt.in";
  const [user, setUser] = useState(null);
  //
  const getToken = async () => {
    const res1 = await axios.get(`${url}/token`);
    if (res1.status === 400) {
      console.log("Something went wrong");
    } else if (res1.status === 200) {
      if (res1.data.token.length === 0) {
        return null;
      } else {
        return res1.data.token[0].token;
      }
    }
  };
  return (
    <AppContext.Provider value={{ url, user, setUser, getToken }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
