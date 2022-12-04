import React  from 'react'
import * as ioicons from 'react-icons/io5'

const ListStudents = (props) => {
    
    const {students} = props;

    function handleDelete(student){
      props.onDelete(student)
    }

    function handleStudent(student){
      console.log(student, "From ListStudents from the li");
      props.showStudent(student);
    }
      
    return (
      <div className="list-students">
        <h2> Participants </h2>
        <ul>
          {students.map((student) => {
            return <li key={student.studentid}> <a student={student} onClick={()=>{handleStudent(student)}}> {student.firstname} {student.lastname} </a> <ioicons.IoTrashBin style={{ marginInlineStart: '5px', color:"red"}} onClick={()=>{handleDelete(student)}}/></li>
          })}
        </ul> 
      </div>
    );
  }
  

export default ListStudents