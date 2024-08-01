import Trash from "../icons/Trash";
import { db } from "../appwrite/databases";
import React from "react";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

const DeleteButton = ({ noteId }) => {
  const { setNotes } = useContext(NoteContext);

  async function handleDelete() {
    db.notes.delete(noteId);
    setNotes((prevState) => {
      return prevState.filter((note) => {
        if (note.$id != noteId) {
          return note;
        }
      });
    });
  }

  return (
    <div onClick={handleDelete}>
      <Trash />
    </div>
  );
};

export default DeleteButton;
