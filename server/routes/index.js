const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

router.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find()
        console.log(notes)
        res.json(notes)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/notes', async (req, res)=>{
    try {
     const note = new Note ({
        title: req.body.title,
        content: req.body.content
     })
     const savedNote = await note.save()
     res.status(201).json(savedNote)
 } catch (error) {
     res.status(400).json({ message: error.message })
 }
})

router.put ('/notes/:id', async(req, res)=>{
    try {
     const note = await Note.findById(req.params.id)
     if(!note) return res.status(404).json({ message: 'Note not found' })
     note.title = req.body.title
     note.content = req.body.content
     const updatedNote = await note.save()
     res.json(updatedNote)   
    } catch (error) {
         res.status(400).json({ message: error.message })
    }
    
})
router.delete('/notes/:id', async(req, res)=>{
    try {
     const note = await Note.findByIdAndDelete(req.params.id)
     if(!note) return res.status(404).json({ message: 'Note not found' })
     res.json({ message: 'Note deleted' })   
    } catch (error) {
         res.status(400).json({ message: error.message })
    }
    
})

module.exports = router