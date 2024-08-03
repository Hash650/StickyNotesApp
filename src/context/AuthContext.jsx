import { useContext, useState, useEffect, createContext } from "react";
import { ID } from "appwrite";
import { account } from "../appwrite/config";
import Spinner from "../icons/Spinner";
import { db } from "../appwrite/databases";

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
    } catch (error) {
      console.log(error.message);
      setLoading(false);
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

      // using a registered user to make a user in the users collection

      // create payload for the user
      const payload = {
        name: JSON.stringify(accountDetail.name),
        user_ID: JSON.stringify(accountDetail.$id),
        notes: [],
      };

      //create a new document in the users collection
      const response2 = await db.users.create(payload,accountDetail.$id);

      setUser(accountDetail);
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };


  const checkUserStatus = async () => {
    try {

      let accountDetails = await account.get();
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
