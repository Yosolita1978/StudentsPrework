import React  from 'react'
import * as ioicons from 'react-icons/io5'

const ListTags = (props) => {
    
    const {tags} = props;

    function handleDelete(tag){
      props.onDelete(tag)
    }

    function handleTag(tag){
      console.log(tag, "From ListTags from the li");
      props.showTags(tag);
    }
      
    return (
      <div className="list-tags">
        <h2> Tags </h2>
        {!tags.length ? <span style={{ color: "red" }}>The Tags table in your db is empty</span> : null}
        <ul>
          {tags.map((tag) => {
            return <li key={tag.tagid}> <a tag={tag} onClick={()=>{handleTag(tag)}}> {tag.name}</a> <ioicons.IoTrashBin style={{ marginInlineStart: '5px', color:"red"}} onClick={()=>{handleDelete(tag)}}/></li>
          })}
        </ul> 
      </div>
    );
  }
  

export default ListTags;