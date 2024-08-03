import { createContext, useEffect, useState } from "react";
import Spinner from "../icons/Spinner";
import { db } from "../appwrite/databases";
import { useAuth } from "./AuthContext";
export const NoteContext = createContext();

const NoteProvider = ({ children }) => {
  const { user } = useAuth();

  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const response = await db.notes.list();

    const usersList = await db.users.list();

    const users = usersList.documents;


    const currentUser = users.find((u)=>{
      return u.$id == user.$id;
    })

    const currentUserNotes = currentUser.notes;
    

    setNotes(currentUserNotes);
    setLoading(false);
  };

  const contextData = { notes, setNotes, selectedNote, setSelectedNote };

  return (
    <NoteContext.Provider value={contextData}>
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
    </NoteContext.Provider>
  );
};

export default NoteProvider;
