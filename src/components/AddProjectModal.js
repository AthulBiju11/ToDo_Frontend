import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

function AddProjectModal({ open, onClose, onAddProject, title }) {
  const [projectTitle, setProjectTitle] = useState('');

  const handleTitleChange = (event) => {
    setProjectTitle(event.target.value);
  };

  const handleAddProject = () => {
    if (projectTitle.trim() !== '') {
      onAddProject(projectTitle);
      setProjectTitle('');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      {title === 'Delete Project' ? (
        <div>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <p>Are you sure you want to delete this project?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onAddProject} variant="contained" color="error">Delete</Button>
          </DialogActions>
        </div>
      ) : (
        <div>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="project-title"
              label="Project Title"
              type="text"
              fullWidth
              value={projectTitle}
              onChange={handleTitleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleAddProject} variant="contained" color="primary">Add</Button>
          </DialogActions>
        </div>
      )}
    </Dialog>
  );
}

export default AddProjectModal;
