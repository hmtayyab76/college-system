import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';
import { useStudents } from 'src/hooks/use-students';
import UpdateStudent from './update-student';

export default function UserTableRow({
  selected,
  id,
  name,
  email,
  age,
  address,
  department,
  handleClick,
}) {
  const { deleteStudent } = useStudents();

  const [dfData, setDfData] = useState({
    id,
    name,
    email,
    age,
    address,
    department
  });

  const handleDelete = (studentId) => {
    deleteStudent(studentId);
  };






  return (
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell>{id}</TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src="/static/mock-images/avatars/avatar_default.jpg" />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{age}</TableCell>
        <TableCell>{address}</TableCell>
        <TableCell>{department}</TableCell>
       
        
        <TableCell align="start">
        <IconButton>
          <UpdateStudent studentId={id} dfData={dfData} setDfData={setDfData}/>
        </IconButton>
          <IconButton onClick={() => handleDelete(id)}>
            <Iconify icon="eva:trash-2-outline" />
          </IconButton>
        </TableCell>
        

      </TableRow>
    
  );
}

UserTableRow.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};