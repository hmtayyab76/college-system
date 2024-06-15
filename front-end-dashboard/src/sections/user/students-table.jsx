import React from 'react';
import { useStudents } from "src/hooks/use-students"; 
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper 
} from '@mui/material';

const StudentTable = () => {
  const { students, error } = useStudents();

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Department</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.student_id}>
              <TableCell>{student.student_id}</TableCell>
              <TableCell>{student.student_name}</TableCell>
              <TableCell>{student.student_email}</TableCell>
              <TableCell>{student.student_age}</TableCell>
              <TableCell>{student.student_address}</TableCell>
              <TableCell>{student.student_department}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentTable;