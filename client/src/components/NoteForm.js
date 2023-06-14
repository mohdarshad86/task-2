import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'
import dotenv from 'dotenv';

dotenv.config();

var PATH = process.env.PATH || 'http://localhost:5000';

const NoteForm = ({ notes, setNotes }) => {
  const [showNote, setShowNote] = useState(false)
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const addNote = async () => {
    const newNote = { title, content };

    try {
      let addedNote = await axios.post(`${PATH}/api/notes`, newNote);
      console.log('Note added successfully!');
      setTitle('');
      setContent('');
      console.log(addedNote);
      setNotes([...addedNote.data, ...notes])
      handleNotes()
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleNotes = () => {
    setShowNote(!showNote)
  }
  return (
    <div className='form'>
      {showNote ? <>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={content}
          rows="5"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button className='add-note' onClick={addNote}>Add Note</button>
      </> : <button className='show-note' onClick={handleNotes}>Take a Note...</button>
      }
    </div>
  );
};

export default NoteForm;