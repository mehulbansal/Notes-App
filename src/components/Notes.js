import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import NoteItem from './NoteItem';
import AddNote from './AddNote';


function Notes() {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    
    useEffect(() => {
        getNotes()
        // eslint-disable-next-line 
    }, [])
    
    const ref = useRef(null);

    const refClose = useRef(null);

    
    const [note, setnote] = useState({id: "", etitle: "", edescription: "", etag: "" })
    const updateNote = (currentNote) => {
        ref.current.click();
        setnote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
    }

    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        // e.preventDefault();
        // console.log(note.id, note.etitle, note.edescription, note.etag)
        
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
    }

    return (
        <>
            <AddNote />
            <button type="button" ref={ref} className="btn btn-primary invisible" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tags</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onchange} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" ref = {refClose} className="btn btn-secondary close" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary close" onClick={handleClick}>Update Note</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="row">
                    <h2>Your Notes</h2>
                    <div className="container">
                    {notes.length === 0 && 'No Notes to display'}
                    </div>
                    {notes.map((notes) => {
                        return <NoteItem key={notes._id} note={notes} updateNote={updateNote} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes