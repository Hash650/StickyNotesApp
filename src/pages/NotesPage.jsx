import NoteCard from "../Components/NoteCard.jsx";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext.jsx";
import Controls from "../Components/Controls.jsx";

function NotesPage() {
  const { notes } = useContext(NoteContext);
  return (
    <div>
      {notes.map((note) => (
        <NoteCard key={note.$id} note={note} />
      ))}
      <Controls />
    </div>
  );
}

export default NotesPage;
