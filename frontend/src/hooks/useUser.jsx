import React, {useState, useEffect} from 'react'

export default function useUser() {

  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) setLoggedUser(JSON.parse(storedUser));
  }, []);
  
  return {
    ...loggedUser
  }
}
