import { useState, createContext, useContext } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const email = localStorage.getItem("email");
  const username = localStorage.getItem("username");

  const [auth, setAuth] = useState({
    username,
    email,
  });

  const setAuthState = ({ username, email }) => {
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);

    setAuth({
      username,
      email,
    });
  };

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    setAuth({
      username: null,
      email: null,
    });
  };

  const isAuthenticated = () => {
    return !!auth.username;
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuthState, isAuthenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
