import NoteCard from "../Components/NoteCard.jsx";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext.jsx";
import Controls from "../Components/Controls.jsx";
import LogoutButton from "../Components/LogoutButton.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function NotesPage() {
  const { logoutUser } = useAuth();

  const { notes } = useContext(NoteContext);
  return (
    <div>
      {notes.map((note) => (
        <NoteCard key={note.$id} note={note} />
      ))}
      <Controls />
      <LogoutButton logout={logoutUser} />
    </div>
  );
}

export default NotesPage;
