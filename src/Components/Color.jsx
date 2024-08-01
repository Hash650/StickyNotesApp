import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import { db } from "../appwrite/databases";

const Color = ({ color }) => {
  const { selectedNote, setNotes, notes } = useContext(NoteContext);

  const changeColor = () => {
    console.log("change color called");
    try {
      const currentNodeIndex = notes.findIndex(
        (note) => note.$id === selectedNote.$id
      );

      console.log(currentNodeIndex);

      const updatedNote = {
        ...notes[currentNodeIndex],
        colors: JSON.stringify(color),
      };

      const newNotes = [...notes];
      newNotes[currentNodeIndex] = updatedNote;

      setNotes(newNotes);
      db.notes.update(selectedNote.$id, { colors: JSON.stringify(color) });
    } catch (error) {
      alert("You must select a note first");
    }
  };

  return (
    <div
      className="color"
      style={{ backgroundColor: color.colorHeader }}
      onClick={changeColor}
    ></div>
  );
};

export default Color;
