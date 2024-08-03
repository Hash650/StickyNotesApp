import Plus from "../icons/Plus";
import colors from "../assets/colors.json";
import { useRef } from "react";
import { db } from "../appwrite/databases";
import { NoteContext } from "../context/NoteContext";
import { useContext } from "react";
import { Query } from "appwrite";
import { useAuth } from "../context/AuthContext";

const AddButton = () => {
  const { user } = useAuth();
  const { setNotes } = useContext(NoteContext);
  const startingPos = useRef(10);
  const addNote = async () => {
    const payload = {
      position: JSON.stringify({
        x: startingPos.current,
        y: startingPos.current,
      }),
      colors: JSON.stringify(colors[0]),
    };

    startingPos.current += 10;

    const response = await db.notes.create(payload);


    //get collections
    const usersList = await db.users.list();
    //get documents in our collection
    const users = usersList.documents;
    //find the current user from documents 
    const currentUser = users.find((u)=>{
      return u.$id == user.$id;
    })

    //update current user's notes field to create a link 
    //between user and a documents inside the notes collection
    const updateUser = await db.users.update(user.$id,{
      name: currentUser.name,
      user_ID: currentUser.user_ID,
      notes:[response,...currentUser.notes]

    })



    setNotes((prevState) => [response, ...prevState]);
    console.log(response);
  };

  return (
    <div id="add-btn" onClick={addNote}>
      <Plus />
    </div>
  );
};

export default AddButton;
