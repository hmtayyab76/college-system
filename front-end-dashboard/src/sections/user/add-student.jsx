import React, { useState } from 'react';
import { useStudents } from 'src/hooks/use-students';
import Iconify from 'src/components/iconify';
import {
  Button, TextField, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle
} from '@mui/material';

export default function AddStudent() {
  const { addStudent } = useStudents();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    student_name: '',
    student_email: '',
    student_address: '',
    student_department: '',
    student_age: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent(formData).then(() => {
      handleClose();
    }).catch(error => {
      console.error(error);
      alert("There was an error adding the student!");
    });
  };

  return (
    <div>
      
      <Button variant="contained" color="inherit" onClick={handleClickOpen} startIcon={<Iconify icon="eva:plus-fill" />} >
        Add New Student
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new student, please enter the details here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="student_name"
            label="Name"
            type="text"
            fullWidth
            value={formData.student_name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="student_email"
            label="Email"
            type="email"
            fullWidth
            value={formData.student_email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="student_address"
            label="Address"
            type="text"
            fullWidth
            value={formData.student_address}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="student_department"
            label="Department"
            type="text"
            fullWidth
            value={formData.student_department}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="student_age"
            label="Age"
            type="number"
            fullWidth
            value={formData.student_age}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}