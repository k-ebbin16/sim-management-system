import { useState } from "react";

function useAuthenticate() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const isAuthenticated = !!token;

  return { isAuthenticated, setToken };
}

export default useAuthenticate;
