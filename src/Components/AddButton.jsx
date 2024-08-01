import Plus from "../icons/Plus";
import colors from "../assets/colors.json";
import { useRef } from "react";
import { db } from "../appwrite/databases";
import { NoteContext } from "../context/NoteContext";
import { useContext } from "react";

const AddButton = () => {
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