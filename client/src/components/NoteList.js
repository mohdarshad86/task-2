import React, { useEffect } from 'react';
import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config()
const PATH = 'http://localhost:5000';

const NoteList = ({ notes, setNotes }) => {

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${PATH}/api/notes`);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${PATH}/api/notes/${id}`);
      console.log('Note deleted successfully!');
      fetchNotes(); // Fetch notes again to update the list
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  function dateTimeFormat(sqlTimestamp) {
    const date = new Date(sqlTimestamp);
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    };
    return date.toLocaleString('en-US', options);
  }


  return (
    <ul className='notes'>
      {notes.map((note) => (
        <li className='note' key={note.id} >
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <p>{dateTimeFormat(note.timestamp)}</p>
          <button onClick={() => deleteNote(note.id)}><span className="material-icons">
            delete
          </span></button>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;