import React, { useState, useEffect } from 'react'
import MyFormTag from './formtags';
import ListTags from './listTags';

const SidebarTags = () => {
    // this is my original state with an array of students 
  const [tags, setTags] = useState([]);

  const onSaveTag = (newTag) =>{
    console.log(newTag, "From the parent - sidebarTags");
    loadTags();
  }

  const loadTags = () =>{
    // A function to fetch the list of tags that will be load anytime that list change
    fetch("http://localhost:8080/api/tags")
      .then((response) => response.json())
      .then((tags) => {
            setTags(tags);
          });
  }

//TO_DO: A function to handle the Delete funtionality
//    const onDelete = (student) =>{
//     //console.log(student, "delete method")
//     return fetch(`http://localhost:8080/api/students/${student.studentid}`, {
//       method: "DELETE"
//     }).then((response) => {
//       //console.log(response);
//       if(response.ok){
//         loadStudents();
//       }
//     })
//   }

// TO-DO: A function to handle the main part of the screen with the tags
//   function showTags(tag){
//     setIsClicked(true);
//     console.log("this is the parent", student);
//     setStudent(student);
//     console.log("this is the parent", student);
//   }

  useEffect(() => {
    loadTags();
  }, []);

  return (
    <div>
    <div className='sidebar-tags'>
        <MyFormTag onSaveTag={onSaveTag}/>
        <ListTags tags={tags} />

    </div>
    </div>
  )
}

export default SidebarTags;