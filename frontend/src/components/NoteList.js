import React from 'react';
import NoteItem from './NoteItem';
import './NoteList.css';

const NoteList = ({ notes, onDelete, onEdit }) => {
  // If there are no notes, show a friendly message
  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <p>Your workspace is empty.</p>
        <p>Start by creating your first note!</p>
      </div>
    );
  }

  return (
    <div className="note-list-grid">
      {notes.map(note => (
        <NoteItem 
          key={note.id} 
          note={note} 
          onDelete={onDelete} 
          onEdit={onEdit} 
        />
      ))}
    </div>
  );
};

export default NoteList;
