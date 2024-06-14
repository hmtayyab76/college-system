import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import { useStudents } from 'src/hooks/use-students';
import {
  Button, TextField, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle,
} from '@mui/material';
import Iconify from 'src/components/iconify';

// Define propTypes for your component


function UpdateStudent({ studentId,dfData }) {
  const { updateStudent } = useStudents();
  const [openUpdateModel, setopenUpdateModel] = useState(false);
  const [formData, setFormData] = useState({
    student_name: dfData.name,
    student_email: dfData.email || '',
    student_address: dfData.address || '',
    student_department: dfData.department || '',
    student_age: dfData.age || '',
  });

  const handleClickOpen = () => {
    setopenUpdateModel(true);
  };

  const handleClose = () => {
    setopenUpdateModel(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateStudent(studentId, formData).then(() => {
      handleClose();
    }).catch(error => {
      console.error(error);
      alert("There was an error updating the student!");
    });
  };

  return (
    <div>
      
            <Iconify icon="eva:edit-fill" onClick={handleClickOpen} />
          
      <Dialog open={openUpdateModel} onClose={handleClose}>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit the student, please update the details here.
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
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

UpdateStudent.propTypes = {
  studentId: PropTypes.number.isRequired,
  dfData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    address: PropTypes.string,
    department: PropTypes.string,
    age: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }).isRequired,
};
export default UpdateStudent;