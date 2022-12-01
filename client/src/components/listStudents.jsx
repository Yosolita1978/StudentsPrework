import React  from 'react'

const ListStudents = (props) => {
    
    const {students} = props;
      
    return (
      <div className="list-students">
        <h2> Students </h2>
        <ul>
          {students.map((student) => {
            return <li key={student.studentid}> {student.firstname} {student.lastname}</li>
          })}
        </ul> 
      </div>
    );
  }
  

export default ListStudents