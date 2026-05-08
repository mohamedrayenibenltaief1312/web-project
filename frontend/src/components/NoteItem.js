import React from 'react';
import './NoteItem.css';

const NoteItem = ({ note, onDelete, onEdit }) => {
  // Helper to format the date into French (e.g., "7 mai 2026")
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Helper to determine badge color based on priority
  const getPriorityClass = (priority) => {
    switch(priority) {
      case 'High': return 'badge-high';
      case 'Medium': return 'badge-medium';
      case 'Low': return 'badge-low';
      default: return 'badge-low';
    }
  };

  return (
    <div className="note-item card">
      <div className="note-header">
        <span className={`badge ${getPriorityClass(note.priority)}`}>
          {note.priority}
        </span>
        <span className="note-date">{formatDate(note.created_at)}</span>
      </div>
      
      <h3 className="note-title">{note.title}</h3>
      <p className="note-content">{note.content}</p>

      <div className="note-actions">
        <button 
          onClick={() => onEdit(note)} 
          className="btn-action edit-btn"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(note.id)} 
          className="btn-action delete-btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
