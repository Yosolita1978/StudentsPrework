import React, { useState, useEffect } from 'react'
import MyForm from './form'
import ListStudents from './listStudents'

const Sidebar = () => {
    // this is my original state with an array of students 
  const [students, setStudents] = useState([]);

  const onSaveStudent = (newStudent) =>{
    console.log(newStudent, "From the parent - sidebar");
    loadStudents();
  }

  const loadStudents = () =>{
    // A function to fetch the list of students that will be load anytime that list change
    fetch("http://localhost:8080/api/students")
      .then((response) => response.json())
      .then((students) => {
            setStudents(students);
          });
  }

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div className='sidebar'>
        <MyForm onSaveStudent={onSaveStudent}/>
        <ListStudents students={students}/>
    </div>
  )
}

export default Sidebar