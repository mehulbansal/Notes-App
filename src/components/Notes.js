import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"
import NoteItem from './NoteItem';

function Notes() {
    const context = useContext(noteContext);
  const {notes, setNotes} = context;

    return (
        <div>
            <div className="row my-5">
                <h2>Your Notes</h2>
                {notes.map((notes) => {
                    return <NoteItem note={notes}/>
                })}
            </div>
        </div>
    )
}

export default Notes