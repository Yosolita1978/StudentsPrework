import React, { useState, useEffect } from 'react'
import MyForm from './form'
import ListStudents from './listStudents'
import Student from './student';

const Sidebar = () => {
    // this is my original state with an array of students 
  const [students, setStudents] = useState([]);
  const [isclicked, setIsClicked] = useState(false);
  const [student, setStudent] = useState({id: null, firstname: "", lastname: ""});

  const onSaveStudent = (newStudent) =>{
    //console.log(newStudent, "From the parent - sidebar");
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

   //A function to handle the Delete funtionality
   const onDelete = (student) =>{
    //console.log(student, "delete method")
    return fetch(`http://localhost:8080/api/students/${student.studentid}`, {
      method: "DELETE"
    }).then((response) => {
      //console.log(response);
      if(response.ok){
        loadStudents();
      }
    })
  }

  function showStudent(student){
    setIsClicked(true);
    //console.log("this is the parent", student);
    setStudent(student);
    //console.log("this is the parent", student);
  }

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div>
    <div className='sidebar'>
        <MyForm onSaveStudent={onSaveStudent}/>
        <ListStudents students={students} onDelete={onDelete} showStudent={showStudent}/>
    </div>
    <div className='mainscreen'>
      {!isclicked ? null : <Student student={student}/>}

    </div>
    </div>
  )
}

export default Sidebar