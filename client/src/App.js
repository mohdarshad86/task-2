import React, { useState } from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

const App = () => {
  const [notes, setNotes] = useState([]);
  return (
    <div>
      <header><h1>Notes App</h1></header>
      <NoteForm notes={notes} setNotes={setNotes}/>
      <NoteList notes={notes} setNotes={setNotes}/>
    </div>
  );
};

export default App;
