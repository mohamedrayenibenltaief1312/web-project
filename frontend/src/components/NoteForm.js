import React, { useState, useEffect } from 'react';
import './NoteForm.css';

const NoteForm = ({ onSave, editingNote, onCancel }) => {
  // Local state for the form fields
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState('Low');

  // This effect runs when the 'editingNote' prop changes
  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setPriority(editingNote.priority);
    } else {
      setTitle('');
      setContent('');
      setPriority('Low');
    }
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if title is empty
    if (!title.trim()) {
      alert("Title is required!");
      return;
    }

    // Call the parent's save function
    onSave({ title, content, priority });
    
    // Reset form
    setTitle('');
    setContent('');
    setPriority('Low');
  };

  return (
    <div className="note-form-card card">
      <h3 className="form-title">
        {editingNote ? 'Edit Note' : 'Create New Note'}
      </h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input 
            type="text" 
            placeholder="Enter title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength="100"
            required
          />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea 
            placeholder="Enter description (optional)..."
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Priority</label>
          <select 
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary">
            {editingNote ? 'Save Changes' : 'Create Note'}
          </button>
          
          {editingNote && (
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
