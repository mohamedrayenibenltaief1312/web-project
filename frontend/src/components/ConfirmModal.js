import React from 'react';
import './ConfirmModal.css';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  // If the modal is not open, don't show anything
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content card">
        <h3 className="modal-title">{title}</h3>
        <p className="modal-message">{message}</p>
        
        <div className="modal-actions">
          <button onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn btn-danger">
            Delete Anyway
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
