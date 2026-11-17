import { createContext, useContext, useState } from "react";
import api from "../api/axios.js";

const AuthContext = createContext(null);

function getSavedUser() {
  try {
    return JSON.parse(localStorage.getItem("noore-user")) || null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getSavedUser);

  // REGISTER USER
  async function register(name, email, password) {
    try {
      const response = await api.post("/users/register", {
        userName: name.trim(),
        userEmail: email.trim().toLowerCase(),
        userPassword: password,
      });

      return {
        success: true,
        message:
          response.data?.message ||
          "Registration successful. Please verify your email.",
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Registration failed. Please try again.",
      };
    }
  }

  // LOGIN USER
  async function login(email, password) {
    try {
      const response = await api.post("/users/login", {
        userEmail: email.trim().toLowerCase(),
        userPassword: password,
      });

      const result = response.data?.data || response.data;
      const userData = result?.user || result;

      if (!result?.accessToken) {
        return {
          success: false,
          message: "Login response mein access token nahi mila.",
        };
      }

      const loggedInUser = {
        id: userData._id || userData.id,
        name: userData.userName,
        email: userData.userEmail,
        role: userData.userRole,
      };

      localStorage.setItem("noore-user", JSON.stringify(loggedInUser));
      localStorage.setItem("noore-access-token", result.accessToken);

      if (result.refreshToken) {
        localStorage.setItem("noore-refresh-token", result.refreshToken);
      }

      setUser(loggedInUser);

      return { success: true, user: loggedInUser };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Login failed. Please check your details.",
      };
    }
  }

  // LOGOUT USER
  function logout() {
    localStorage.removeItem("noore-user");
    localStorage.removeItem("noore-access-token");
    localStorage.removeItem("noore-refresh-token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
