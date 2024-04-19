import React, { useContext, useEffect } from 'react'
import noteContext from "../context/notes/noteContext"
import NoteItem from './NoteItem';
import AddNote from './AddNote';


function Notes() {
    const context = useContext(noteContext);
    const { notes, getNotes, addNote, deleteNote, editNote } = context;

    useEffect(() => {
      getNotes()
    }, [])
    

    return (
        <>
            <AddNote />
            <div>
                <div className="row my-5">
                    <h2>Your Notes</h2>
                    {notes.map((notes) => {
                        return <NoteItem key={notes._id} note={notes} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes