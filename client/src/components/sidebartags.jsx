import React, { useState, useEffect } from 'react'
import MyFormTag from './formtags';
import ListTags from './listTags';
import Tag from './tag';

const SidebarTags = () => {
    // this is my original state with an array of students 
  const [tags, setTags] = useState([]);
  const [isclicked, setIsClicked] = useState(false);
  const [tag, setTag] = useState({id: null, name: ""});


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
const onDelete = (tag) =>{
    return fetch(`http://localhost:8080/api/tags/${tag.tagid}`, {
      method: "DELETE"
    }).then((response) => {
      //console.log(response);
      if(response.ok){
        loadTags();
      }
    })
  }

// A function to handle the main part of the screen with the tags
  function showTags(tag){
    setIsClicked(true);
    setTag(tag);
  }

  useEffect(() => {
    loadTags();
  }, []);

  return (
    <div>
    <div className='sidebar-tags'>
        <MyFormTag onSaveTag={onSaveTag}/>
        <ListTags tags={tags} onDelete={onDelete} showTags={showTags} />
    </div>
    <div className='mainscreen-tags'>
      {!isclicked ? null : <Tag tag={tag}/>}

    </div>
    </div>
  )
}

export default SidebarTags;