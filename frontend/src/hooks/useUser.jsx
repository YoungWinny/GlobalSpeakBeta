// import React, {useState, useEffect} from 'react'

// export default function useUser() {

//   const [loggedUser, setLoggedUser] = useState(null);

//   useEffect(() => {
//     const storedUser = sessionStorage.getItem("user");
//     if (storedUser) setLoggedUser(JSON.parse(storedUser));
//   }, []);
  
//   return {
//     ...loggedUser
//   }
// }



// hooks/useUser.jsx
import { useState, useEffect } from 'react';

export default function useUser() {
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        setLoggedUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  return loggedUser;
}