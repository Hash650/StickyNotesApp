import { useContext, useState, useEffect, createContext } from "react";
import { ID } from "appwrite";
import { account } from "../appwrite/config";
import Spinner from "../icons/Spinner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(false);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const loginUser = async (userInfo) => {
    setLoading(true);

    try {
      let response = await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      );

      let accountDetail = await account.get();
      setUser(accountDetail);

      // console.log("Account: ", accountDetail);
    } catch (error) {
      console.log(error.message);
      return false;
    }
    setLoading(false);
  };

  const logoutUser = () => {
    account.deleteSession("current");
    setUser(null);
  };

  const registerUser = async (userInfo) => {
    setLoading(true);

    try {
      let response = await account.create(
        ID.unique(),
        userInfo.email,
        userInfo.pass1,
        userInfo.name
      );

      await account.createEmailPasswordSession(userInfo.email, userInfo.pass1);

      let accountDetail = await account.get();
      setUser(accountDetail);
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  const checkUserStatus = async () => {
    try {
      // let sessions = await account.getSession("current");
      // console.log(sessions);
      let accountDetails = await account.get();
      console.log(accountDetails);
      setUser(accountDetails);
    } catch (error) {
      console.log(error.message);
    }

    setLoading(false);
  };

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
