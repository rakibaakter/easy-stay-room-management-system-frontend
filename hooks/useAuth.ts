"use client";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [decodedUser, setDecodedUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        setDecodedUser(jwtDecode(token));
      }
    }
  }, []);

  return decodedUser;
};

export default useAuth;
