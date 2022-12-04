import React  from 'react'
import * as ioicons from 'react-icons/io5'

const ListTags = (props) => {
    
    const {tags} = props;

    // function handleDelete(student){
    //   props.onDelete(student)
    // }

    function handleTag(tag){
      console.log(tag, "From ListTags from the li");
      //props.show(student);
    }
      
    return (
      <div className="list-tags">
        <h2> Tags </h2>
        <ul>
          {tags.map((tag) => {
            return <li key={tag.tagid}> <a tag={tag} onClick={()=>{handleTag(tag)}}> {tag.name}</a> <ioicons.IoTrashBin style={{ marginInlineStart: '5px', color:"red"}}/></li>
          })}
        </ul> 
      </div>
    );
  }
  

export default ListTags;