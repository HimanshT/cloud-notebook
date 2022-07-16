import React from 'react'

const Noteitem = (props) => {
    const { note } = props;
    return (
        <>
            <div class="card w-75 mb-3">
                <div class="card-body">
                    <h5 class="card-title">{note.title}</h5>
                    <p class="card-text">{note.description}</p>
                </div>
            </div>
        </>
    )
}

export default Noteitem
