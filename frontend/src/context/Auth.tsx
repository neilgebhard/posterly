import { useState, createContext, useContext } from "react";
import type { User } from "../types";

type AuthContextType = {
  auth: User;
  setAuthState: (user: User) => void;
  isAuthenticated: () => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type Props = {
  children: React.ReactNode;
};

function AuthProvider({ children }: Props) {
  const _id = localStorage.getItem("_id");
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const isAdmin = !!localStorage.getItem("isAdmin");

  const [auth, setAuth] = useState<User>({
    _id: _id || "",
    username: username || "",
    email: email || "",
    isAdmin: isAdmin || false,
  });

  const setAuthState = ({ _id, username, email, isAdmin }: User) => {
    localStorage.setItem("_id", _id);
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("isAdmin", isAdmin.toString());

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
      _id: "",
      username: "",
      email: "",
      isAdmin: false,
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
