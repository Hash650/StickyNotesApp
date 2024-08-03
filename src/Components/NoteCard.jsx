import { useRef, useEffect, useState, useContext } from "react";
import Trash from "../icons/Trash";
import { setNewOffset } from "../utils";
import { autoGrow } from "../utils";
import { setZIndex, bodyParser } from "../utils";
import { db } from "../appwrite/databases";
import Spinner from "../icons/Spinner";
import DeleteButton from "./DeleteButton";
import { NoteContext } from "../context/NoteContext";

function NoteCard(props) {
  const { setSelectedNote } = useContext(NoteContext);
  const body = bodyParser(props.note.body);
  const [position, setPosition] = useState(bodyParser(props.note.position));
  const colors = bodyParser(props.note.colors);

  const [saving, setSaving] = useState(false);
  const keyUpTimer = useRef();

  const textAreaRef = useRef(null);

  //make card dragable
  let mouseStartPos = { x: 0, y: 0 };
  const cardRef = useRef(null);

  const mouseDown = (e) => {
    if (e.target.className === "card-header") {
      setSelectedNote(props.note);
      mouseStartPos.x = e.clientX;
      mouseStartPos.y = e.clientY;

      setZIndex(cardRef.current);
      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
    }
  };

  const mouseMove = (e) => {
    const mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    const newPostion = setNewOffset(cardRef.current, mouseMoveDir);

    setPosition(newPostion);
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);

    const newPosition = setNewOffset(cardRef.current);
    saveData("position", newPosition);
  };
  // end of draggable

  //saving information
  const saveData = async (key, value) => {
    const payload = { [key]: JSON.stringify(value) };

    try {
      const updatedNote= await db.notes.update(props.note.$id, payload);
      // console.log("Updated Note, ", updatedNote);
    } catch (error) {
      console.log(error);
    }

    setSaving(false);
  };

  const handleKeyUp = () => {
    setSaving(true);

    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }
    keyUpTimer.current = setTimeout(() => {
      saveData("body", textAreaRef.current.value);
    }, 2000);
  };

  useEffect(() => {
    autoGrow(textAreaRef);
    setZIndex(cardRef.current);
  }, []);

  return (
    <div
      className="card"
      onMouseDown={mouseDown}
      ref={cardRef}
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
      >
        <DeleteButton noteId={props.note.$id} />
        {saving && (
          <div className="card-saving">
            <Spinner color={colors.colorText} />
            <span style={{ color: colors.colorText }}>Saving</span>
          </div>
        )}
      </div>
      <div className="card-body">
        <textarea
          onKeyUp={handleKeyUp}
          ref={textAreaRef}
          defaultValue={body}
          style={{ color: colors.colorText }}
          onInput={() => autoGrow(textAreaRef)}
          onFocus={() => {
            setSelectedNote(props.note);
            setZIndex(cardRef.current);
          }}
          name=""
          id=""
        ></textarea>
      </div>
    </div>
  );
}

export default NoteCard;
