import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "62d239bcfc9e00bd11b0c4d2",
            "user": "62cc600d1dcf4539815c6282",
            "title": "New note 1",
            "description": "this is our first note",
            "tag": "study",
            "date": "2022-07-16T04:08:28.914Z",
            "__v": 0
        },
        {
            "_id": "62d239d7fc9e00bd11b0c4d4",
            "user": "62cc600d1dcf4539815c6282",
            "title": "New note 2",
            "description": "this is our second note",
            "tag": "Play",
            "date": "2022-07-16T04:08:55.322Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesInitial);
    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;