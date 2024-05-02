import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext"

function AddNote(props) {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setnote] = useState({title:"", description:"", tag:""}) 

    const handleClick =(e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note. tag);
        setnote({title:"", description:"", tag:""})
    }

    const onchange = (e) =>{
        setnote({...note, [e.target.name]:e.target.value})
    }
    return (
        <div>
            <div className='container my-3'>
                <h2>Add a Note</h2>

                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onchange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onchange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tags</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={onchange} value={note.tag}/>
                    </div>
                    <button type="submit" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote