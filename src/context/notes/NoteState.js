import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) =>{
    const noteInitial = [
        {
          "_id": "661062bd98b32df13a138439",
          "user": "660d33fe0ec2a54e22c4b6ca",
          "title": "My Title",
          "description": "Hello World",
          "tag": "Testing",
          "date": "2024-04-05T20:44:45.455Z",
          "__v": 0
        },
        {
          "_id": "66106349a19babc2ca3ef689",
          "user": "660d33fe0ec2a54e22c4b6ca",
          "title": "My Title",
          "description": "Hello World",
          "tag": "Yellow",
          "date": "2024-04-05T20:47:05.899Z",
          "__v": 0
        },
        {
            "_id": "661062bd98b32df13a138439",
            "user": "660d33fe0ec2a54e22c4b6ca",
            "title": "My Title",
            "description": "Hello World",
            "tag": "Testing",
            "date": "2024-04-05T20:44:45.455Z",
            "__v": 0
          },
          {
            "_id": "66106349a19babc2ca3ef689",
            "user": "660d33fe0ec2a54e22c4b6ca",
            "title": "My Title",
            "description": "Hello World",
            "tag": "Yellow",
            "date": "2024-04-05T20:47:05.899Z",
            "__v": 0
          },
          {
            "_id": "66106349a19babc2ca3ef689",
            "user": "660d33fe0ec2a54e22c4b6ca",
            "title": "My Title",
            "description": "Hello World",
            "tag": "Yellow",
            "date": "2024-04-05T20:47:05.899Z",
            "__v": 0
          },
          {
            "_id": "661062bd98b32df13a138439",
            "user": "660d33fe0ec2a54e22c4b6ca",
            "title": "My Title",
            "description": "Hello World",
            "tag": "Testing",
            "date": "2024-04-05T20:44:45.455Z",
            "__v": 0
          },
          {
            "_id": "66106349a19babc2ca3ef689",
            "user": "660d33fe0ec2a54e22c4b6ca",
            "title": "My Title",
            "description": "Hello World",
            "tag": "Yellow",
            "date": "2024-04-05T20:47:05.899Z",
            "__v": 0
          },
          {
              "_id": "661062bd98b32df13a138439",
              "user": "660d33fe0ec2a54e22c4b6ca",
              "title": "My Title",
              "description": "Hello World",
              "tag": "Testing",
              "date": "2024-04-05T20:44:45.455Z",
              "__v": 0
            },
            {
              "_id": "66106349a19babc2ca3ef689",
              "user": "660d33fe0ec2a54e22c4b6ca",
              "title": "My Title",
              "description": "Hello World",
              "tag": "Yellow",
              "date": "2024-04-05T20:47:05.899Z",
              "__v": 0
            },
            {
              "_id": "66106349a19babc2ca3ef689",
              "user": "660d33fe0ec2a54e22c4b6ca",
              "title": "My Title",
              "description": "Hello World",
              "tag": "Yellow",
              "date": "2024-04-05T20:47:05.899Z",
              "__v": 0
            }
      ]
      const [notes, setnotes] = useState(noteInitial)
    return (
        <noteContext.Provider value = {{notes, setnotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;