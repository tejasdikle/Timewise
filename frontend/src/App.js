import * as React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CustomerRoutes from "./Routers/CustomerRoutes";
import AdminPanel from "./Admin/AdminPanel";
import { useEffect, useState } from "react";
import Routers from './Routers/Routers';
import SearchBar from './customer/components/SearchBar/SearchBar';
import SearchResultsList from './customer/components/SearchBar/SearchResultList';
import SearchResultList from './customer/components/SearchBar/SearchResultList';
//import SearchResultsList from './customer/components/SearchBar/SearchResultsList'; // Import SearchResultsList

function App() {
  const [user, setUser] = useState(null);
  const [results, setResults] = useState(null); // Define results state
  const jwt = localStorage.getItem("jwtTokenData");

  useEffect(() => {
    const fetchUserData = async (jwt) => {
      try {
        const response = await fetch(`/api/user/${jwt}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const getUserData = async () => {
      if (jwt) {
        await fetchUserData(jwt);
      }
    };

    getUserData();
  }, [jwt]);

  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Routers/>} />
          {user?.role === "ADMIN" && (
            <Route path="/admin/*" element={<AdminPanel />} />
          )}
          
        </Routes>
        {/* <div className="search-bar-container"> */}
          {/* <SearchBar setResults={setResults} /> */}
          {/* Pass setResults as prop */}
          {/* {results && results.length > 0 && <SearchResultList results={results} />} Render SearchResultsList conditionally */}
        {/* </div> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
