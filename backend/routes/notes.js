const express = require('express');
const Note = require('../models/Notes');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
//Get: /api/notes/fetchallnotes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (err) {
        res.status(500).send("Internal server error");
    }
})

//post: /api/notes/addNote
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Minimum length must be 5').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //if errors return errors;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.log(err.message);
        res.status(500).send('internal server error');
    }
})

//put: /api/notes/updatenote. Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    //create a new node
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };
    //finding the note to be updated
    let note = await Note.findById(req.params.id);
    if (!note) {
        return res.status(400).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
        return res.status(400).send("Not found");
    }
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note });
})

//delete: /api/notes/deletenode/:id

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    let note = await Note.findById(req.params.id);
    if (!note) {
        return res.status(400).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
        return res.status(400).send("You cannot delete it");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ "success": "Note has been deleted successfully" });
    res.send("note deleted");
})

module.exports = router;