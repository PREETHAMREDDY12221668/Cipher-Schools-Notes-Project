const Notes = require("../models/notes.model");
const User = require("../models/users.model");

async function createNote(req, res) {
  const {text} =req.body;
  try {
      if(!req.userId){
        return res.status(403).json({ success: 403, message: 'unauthorized user'});
      }

      console.log(`user details : ${req.userId}`);

      const user=await User.findById(req.userId);
      if(!user) {
        res.status(404).json({ success: 404, message: "User not found" });
      }

      const newNote = new Notes({
          text,
          userId:user._id, // Access user ID from authentication middleware
      });

        const savedNote = await newNote.save();
        return res.status(201).json({ success: 200, data: savedNote }); // Send created note with status 201
    } catch (err) {
      console.error('Error creating note:', err);
      return res.status(500).json({ success: 500, message: `Error creating note: ${err.message}` }); // Generic error message for security
  }
}

async function getNote(req, res) {
    try {
        const noteId = req.params.noteId; // Assuming you have a note ID parameter
        const note = await Notes.findById(noteId);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        // Add authorization check if notes are private (optional)
        if (note.userId.toString() !== req.usertoken.id) {
            return res.status(403).json({message: 'Unauthorized to access this note' });
        }
        res.json(note);
    } catch (err) {
        console.error('Error getting note:', err);
        res.status(500).json({ success: 500, message: 'Error getting note' });
    }
}

async function getAllNotes(req, res) {
  console.log("Getting all notes")
  try {
    if (!req.userId) {
      return res.status(403).json({ success: 403, message: 'Unauthorized user' });
    }

    const notes = await Notes.find({ userId: req.userId });
    return res.status(200).json({ success: 200, notes });
  } catch (err) {
    console.error('Error getting all notes:', err);
    return res.status(500).json({ success: 500, message: 'Error getting all notes' });
  }
}

async function updateNotes(req, res) {
  const { text } = req.body;
  const noteId = req.params.noteId; // Ensure you get the note ID from the URL parameters

  if (!req.userId) {
    return res.status(403).json({ success: 403, message: 'Unauthorized user' });
  }

  try {
    const note = await Notes.findById(noteId);
    if (!note) {
      return res.status(404).json({ success: 404, message: 'Note not found' });
    }

    // Ensure that the user making the request is the owner of the note
    if (note.userId.toString() !== req.userId) {
      return res.status(403).json({ success: 403, message: 'Unauthorized to update this note' });
    }

    note.text = text;
    note.updatedAt = Date.now();
    await note.save();

    res.json({ success: 200, message: 'Note updated successfully', note });
  } catch (err) {
    console.error('Error updating note:', err);
    res.status(500).json({ success: 500, message: 'Error updating note' });
  }
}

async function deleteNotes(req, res) {
    const noteId = req.params.noteId; // Assuming you have a note ID parameter

    try {
        const note = await Notes.findByIdAndDelete(noteId);
        if (!note) {
            return res.status(404).json({ success: 404, message: 'Note not found' });
        }
        // Add authorization check if notes are private (optional)
        if (note.userId.toString() !== req.usertoken.id) {
            return res.status(403).json({ success: 403, message: 'Unauthorized to delete this note' });
        }
        res.json({ success: 200, message: 'Note deleted successfully' });
    } catch (err) {
        console.error('Error deleting note:', err);
        res.status(500).json({ success: 500, message: 'Error deleting note' });
    }
}

module.exports = {
    createNote,
    getNote,
    getAllNotes,
    updateNotes,
    deleteNotes
};
