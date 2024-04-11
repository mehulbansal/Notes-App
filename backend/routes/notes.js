const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');


// Get all the notes: GET: "http://localhost:5000/api/notes/fetchallNotes"
router.get('/fetchallNotes', fetchUser, async (req, res)=>{
    try{
        const userid = req.user.id;
        const notes = await Notes.find({user: userid});
        res.send(notes);
    }
    catch(error){
        console.log(error.message);
        res.status(501).send("Internal Server Error");
    }
})

// Post Notes to the app: POST: "http://localhost:5000/api/notes/addNote"
router.post('/addNote', fetchUser, [
    body('title', 'Enter a Valid Title').isLength({min: 3}),
    body('description', "Description must be atleast 5 character").isLength({min:5}),
    // body('Tag', "Password should be atleast 5 characters").isLength({min:5}),
], async (req, res)=>{

    // If there are bad requests return error code 400. Else create User
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        const {title, description, tag} = req.body;
        const note = new Notes({
            title, description, tag, user:req.user.id
        });
        const savedNote = await note.save();  
        res.send(savedNote);  
    }
    catch(error){
        console.log(error.message);
        res.status(501).send("Internal Server Error");
    }
})


// Route - 3: Update an existing Node

router.put('/updateNote/:id', fetchUser, async (req, res)=>{
    try{
        const{title, description, tag} = req.body;
        const newNote = {};
        if(title) {newNote.title  = title};
        if(description) {newNote.description = description};
        if(tag) {newNote.tag  = tag};   
        
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }
        
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Unauthorized Access");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        res.json(note);
    }
    catch(error){
        console.log(error.message);
        res.status(501).send("Internal Server Occured");
    }
})

// Router 4: Delete Node

router.delete('/deleteNote/:id', fetchUser, async (req, res)=>{
    try{        
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }
        
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Unauthorized Access");
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note has been Deleted", note:note});
    }
    catch(error){
        console.log(error.message);
        res.status(501).send("Internal Server Occured");
    }
})
module.exports = router;