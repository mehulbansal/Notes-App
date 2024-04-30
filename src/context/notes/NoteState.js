import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {

  const host = 'http://localhost:5000/';

  const noteInitial = [];
  const [notes, setnotes] = useState(noteInitial)


  const getNotes = async () =>{
    const url = `${host}api/notes/fetchallNotes/`;
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwZDMzZmUwZWMyYTU0ZTIyYzRiNmNhIn0sImlhdCI6MTcxMjMwODYxNX0.bDlu8PEDsa6P38HVKDWnXWFhoac_SVoXOro10_WCe08"
      },
    });
    const json =await response.json(); 
    console.log(Object.values(json));

    setnotes(json)
  }

  

  // Add a Note
  const addNote = async (title,description,tag) => {

    const url = `${host}api/notes/addNote/`;
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwZDMzZmUwZWMyYTU0ZTIyYzRiNmNhIn0sImlhdCI6MTcxMjMwODYxNX0.bDlu8PEDsa6P38HVKDWnXWFhoac_SVoXOro10_WCe08"
      },
      body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log(json);
    const note = {
      "_id": "66106349a19bab11c7978923ca3ef689",
      "user": "660d33fe0ec2a54e22c4b6ca",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-04-05T20:47:05.899Z",
      "__v": 0
    }
    setnotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = async (id) => {

    const url = `${host}api/notes/deleteNote/${id}`;
    const response = await fetch(url, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwZDMzZmUwZWMyYTU0ZTIyYzRiNmNhIn0sImlhdCI6MTcxMjMwODYxNX0.bDlu8PEDsa6P38HVKDWnXWFhoac_SVoXOro10_WCe08"
      },
    });
    // console.log("Deleting the note with ID: " + id)
    const newNotes = notes.filter((note) => {
      return note._id != id;
    })
    setnotes(newNotes)
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {

    const url = `${host}api/notes/updateNote/${id}`;
    const response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwZDMzZmUwZWMyYTU0ZTIyYzRiNmNhIn0sImlhdCI6MTcxMjMwODYxNX0.bDlu8PEDsa6P38HVKDWnXWFhoac_SVoXOro10_WCe08"
      },
      body: JSON.stringify({id, title, description, tag}), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log(json);

    let newNotes = await JSON.parse(JSON.stringify(notes));


    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    // console.log(newNotes);
    setnotes(newNotes);
  }


  return (
    <noteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;