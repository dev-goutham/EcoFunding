import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Include the Quill CSS
const EditModal = ({ content, onSave, onClose }) => {
  const [editedValue, setEditedValue] = useState(content.description);

  return (
    <div className="modal"> 
      <div className="modal-content">
        <ReactQuill value={editedValue} onChange={setEditedValue} />
        <button onClick={() => onSave(editedValue)}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div> 
    </div> // Add CSS for styling the overlay and container
  );
};
export default EditModal;