import { useContext, useState, useEffect, createContext } from "react";
import Spinner from "../icons/Spinner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  const loginUser = (userInfo) => {};

  const logoutUser = () => {};

  const registerUser = (userInfo) => {};

  const checkUserStatus = () => {};

  const contextData = { user, loginUser, logoutUser, registerUser };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Spinner size="100" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
