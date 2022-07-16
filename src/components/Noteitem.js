import React from 'react'

const Noteitem = (props) => {
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
                        <i className="fa-solid fa-file-pen mx-2">Edit</i>
                        <i className="fa-solid fa-trash mx-2">Delete</i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Noteitem




