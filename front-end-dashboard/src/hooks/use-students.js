import axios from 'axios';
import { useState, useEffect } from 'react';

export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    axios.get('http://localhost:3000/')
      .then(response => setStudents(response.data))
      .catch(err => {
        console.error("There was an error fetching the data!", err);
        setError("There was an error fetching the data!");
      });
  }, []);

  const addStudent = (newStudent) => 
    axios.post('http://localhost:3000/students', newStudent)
      .then(response => {
        setStudents(prevStudents => [...prevStudents, response.data]);
        alert("New Student Added ID:" , newStudent.id )
        return response.data;
      })
      .catch(err => {
        console.error("There was an error adding the student!", err);
        throw new Error("There was an error adding the student!");
      });

      const deleteStudent = (studentId) => 
        axios.delete(`http://localhost:3000/students/${studentId}`)
          .then(() => {
            setStudents(prevStudents => prevStudents.filter(student => student.student_id !== studentId));
          })
          .catch(err => {
            console.error("There was an error deleting the student!", err);
            throw new Error("There was an error deleting the student!");
          });
    
      const updateStudent = (studentId, updatedStudent) => 
        axios.put(`http://localhost:3000/students/${studentId}`, updatedStudent)
          .then(() => {
            setStudents(prevStudents => prevStudents.map(student => 
              student.student_id === studentId ? { ...student, ...updatedStudent } : student
            ));
          })
          .catch(err => {
            console.error("There was an error updating the student!", err);
            throw new Error("There was an error updating the student!");
          });

  return { students, error, addStudent, deleteStudent, updateStudent };
};