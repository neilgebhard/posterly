import { useState, createContext, useContext } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const _id = localStorage.getItem("_id");
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const isAdmin = localStorage.getItem("isAdmin");

  const [auth, setAuth] = useState({
    _id,
    username,
    email,
    isAdmin,
  });

  const setAuthState = ({ _id, username, email, isAdmin }) => {
    localStorage.setItem("_id", _id);
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("isAdmin", isAdmin);

    setAuth({
      _id,
      username,
      email,
      isAdmin,
    });
  };

  const logout = () => {
    localStorage.removeItem("_id");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("isAdmin");

    setAuth({
      _id: null,
      username: null,
      email: null,
      isAdmin: null,
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
