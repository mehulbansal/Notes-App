import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"
import Notes from './Notes.js';
import AddNote from './AddNote.js';
export const Home = () => {
  const context = useContext(noteContext);
  const {notes, setNotes} = context;
  return (
    <>
      
      <Notes/>

    </>
  )
}

export default Home
