const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notes.controller");
const {authenticateToken}=require('../middlewares/auth.middleware')

router.post("/",authenticateToken,notesController.createNote);

router.get("/:noteId", authenticateToken,notesController.getNote); // Get a specific note by ID

router.get("/",authenticateToken, notesController.getAllNotes); // Get all notes for the authenticated user

router.patch("/:noteId", authenticateToken,notesController.updateNotes); // Update a specific note by ID

router.delete("/:noteId", authenticateToken,notesController.deleteNotes); // Delete a specific note by ID

module.exports = router;
