import React, { useState, useEffect } from 'react';
import api from '../api'; // Our telephone to Laravel
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import Toast from './Toast';
import ConfirmModal from './ConfirmModal';
import './Dashboard.css';

const Dashboard = () => {
  // 1. State for the list of notes (starts EMPTY now)
  const [notes, setNotes] = useState([]);
  
  // 2. Other states
  const [editingNote, setEditingNote] = useState(null);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [filterPriority, setFilterPriority] = useState('All');
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // 3. FETCH NOTES FROM BACKEND
  const fetchNotes = async () => {
    try {
      const response = await api.get('/notes');
      setNotes(response.data); // Replace empty list with real notes from DB
    } catch (err) {
      showToast("Could not load notes.", "error");
    } finally {
      setLoading(false);
    }
  };

  // This runs ONCE when the page loads
  useEffect(() => {
    fetchNotes();
  }, []);

  // 4. Compute the filtered list
  const filteredNotes = filterPriority === 'All' 
    ? notes 
    : notes.filter(note => note.priority === filterPriority);

  // 5. Handle Create or Update (Now with API!)
  const handleSaveNote = async (formData) => {
    try {
      if (editingNote) {
        // UPDATE: PUT /api/notes/{id}
        const response = await api.put(`/notes/${editingNote.id}`, formData);
        setNotes(notes.map(n => n.id === editingNote.id ? response.data : n));
        setEditingNote(null);
        showToast("Note updated in database!");
      } else {
        // CREATE: POST /api/notes
        const response = await api.post('/notes', formData);
        setNotes([response.data, ...notes]); // Add the real note returned by Laravel
        showToast("Note saved in database!");
      }
    } catch (err) {
      showToast("Error saving note.", "error");
    }
  };

  // 6. Handle Delete (Now with API!)
  const initiateDelete = (id) => {
    setNoteToDelete(id);
  };

  const confirmDelete = async () => {
    try {
      // DELETE: DELETE /api/notes/{id}
      await api.delete(`/notes/${noteToDelete}`);
      setNotes(notes.filter(note => note.id !== noteToDelete));
      setNoteToDelete(null);
      showToast("Note removed from database!");
    } catch (err) {
      showToast("Error deleting note.", "error");
    }
  };

  const handleEditClick = (note) => {
    setEditingNote(note);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <div className="dashboard-container"><p>Loading your notes...</p></div>;

  return (
    <div className="dashboard-container">
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      <ConfirmModal 
        isOpen={noteToDelete !== null}
        title="Delete Note"
        message="Are you sure you want to delete this note permanently?"
        onConfirm={confirmDelete}
        onCancel={() => setNoteToDelete(null)}
      />

      <div className="dashboard-grid">
        <div className="form-section">
          <NoteForm 
            onSave={handleSaveNote} 
            editingNote={editingNote} 
            onCancel={() => setEditingNote(null)} 
          />
        </div>

        <div className="list-section">
          <div className="list-header">
            <div className="header-left">
              <h2>My Notes</h2>
              <span className="note-count">
                {filteredNotes.length} {filteredNotes.length === 1 ? 'Note' : 'Notes'}
              </span>
            </div>

            <div className="filter-section">
              <label>Filter by priority</label>
              <div className="filter-wrapper">
                <select 
                  value={filterPriority} 
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="filter-select"
                >
                  <option value="All">All Notes</option>
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>
            </div>
          </div>

          <NoteList 
            notes={filteredNotes} 
            onDelete={initiateDelete} 
            onEdit={handleEditClick} 
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
