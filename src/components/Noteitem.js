import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

const Noteitem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote, updatenote } = context;
    const { note } = props;
    return (
        <>
            <div className="col-md-3">
                <div className="card my-4">
                    <div className="card-body">
                        <div className='d-flex align-items-center'>
                            <i className="fa-solid fa-note-sticky mx-2"></i>
                            <h5 className="card-title">{note.title}</h5>
                        </div>
                        <p className="card-text">{note.description}</p>
                        <i className="fa-solid fa-file-pen mx-2" onClick={() => { updatenote(note) }}>Edit</i>
                        <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id) }}>Delete</i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Noteitem




