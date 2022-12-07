import React, { useState, useEffect } from 'react';
import moment from 'moment/min/moment-with-locales';

//{id: null, firstname: "", lastname: ""}

const Student = (props) => {

  const [tags, setTags] = useState([]);


  const loadTagsforStudent = () => {
    let studentId = props.student.studentid;
    // A function to fetch the list of tags that will be load anytime that the student change
    fetch(`http://localhost:8080/api/students/${studentId}/tags`)
      .then((response) => response.json())
      .then((tags) => {
        setTags(tags);
      });
  }

  useEffect(loadTagsforStudent, [props.student]);

  return (
    <div>
      List of themes the student needs to work:
      <ul>
        {tags.map((tag, index) => <li key={index}>{tag.name} | Enter in the system on: <span>{moment.utc(tag.taggeddate).format("MMM Do, YYYY")}</span></li>)}
      </ul>
    </div>
  )
}


export default Student;