import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
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

    //add a note
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjYzYwMGQxZGNmNDUzOTgxNWM2MjgyIn0sImlhdCI6MTY1NzU2MTE3M30._IVoXkZdfH61v9ltnYwjGbt8_vslnlPV27tP5Bo6X40"
            }
        });
        const json = await response.json();

        console.log(json);
        setNotes(json);
    }
    //add a note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjYzYwMGQxZGNmNDUzOTgxNWM2MjgyIn0sImlhdCI6MTY1NzU2MTE3M30._IVoXkZdfH61v9ltnYwjGbt8_vslnlPV27tP5Bo6X40"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();

        console.log("adding a new note");
        const note = {
            "_id": "62d239d7fc9e00bd9b0c4d4",
            "user": "62cc600d1dcf453a8198d6282",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-07-16T04:08:55.322Z",
            "__v": 0
        }
        setNotes(notes.concat(note));
    }

    //Delete a note
    const deleteNote = async (id) => {
        //API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjYzYwMGQxZGNmNDUzOTgxNWM2MjgyIn0sImlhdCI6MTY1NzU2MTE3M30._IVoXkZdfH61v9ltnYwjGbt8_vslnlPV27tP5Bo6X40"
            }
        });
        const json = response.json();
        console.log(json);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }

    //Edit a note
    const editNote = async (id, title, description, tag) => {
        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjYzYwMGQxZGNmNDUzOTgxNWM2MjgyIn0sImlhdCI6MTY1NzU2MTE3M30._IVoXkZdfH61v9ltnYwjGbt8_vslnlPV27tP5Bo6X40"
            },
            body: JSON.stringify(title, description, tag)
        });

        for (let i = 0; i < notes.length; i++) {
            const element = notes[i];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }


    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;