import React, { useState } from 'react'
import { Button, Form } from "react-bootstrap";

const MyFormTag = (props) => {
    const { initialTag = { id: null, name: "" } } = props;

    // This is the oroginal State with not initial tag 
    const [tag, setTag] = useState(initialTag);

    // This is the initial state for the errors in the form. - no empy field and no numbers
    const [error, setError] = useState({name: ""})

    //create functions that handle the event of the user typing into the form - here are the form validation regex
    const handleName = (event) => {
        let errorName;
        const name = event.target.value;
        if(name.length <= 1){
            errorName = "The name field must be a valid word";
            setError({name: errorName});
        } else if(!name.match(/^[a-zA-Z0-9]+$/)){
            errorName = "No special characters allowed";
            setError({name: errorName});
        } else{
            setError({name: ""});
        }
        
        setTag((tag) => ({ ...tag, name }));
    

    };

    //A helper function to capitalize always the Tags - consistency on the db
    function capitalizeFirstLetter(string){
        let newString = string.trim();
        let result = newString.charAt(0).toUpperCase() + newString.slice(1);
        return result;
      }

    //A function to handle the post request
    const postTag = (newTag) => {

        return fetch("http://localhost:8080/api/tags", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTag),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                //console.log("From the post ", data);
                props.onSaveTag(data);
                //This is just to clean the form to a empty state
                setTag({ id: null, name: ""});
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let cleanUserInput = capitalizeFirstLetter(tag.name);
        let newTag = {id: null, name: cleanUserInput}
        postTag(newTag);
        setTag({ id: null, name: ""});
    };

    return (
        <Form className='form-tag' onSubmit={handleSubmit}>
            <Form.Label>Name</Form.Label>
            <input
                type="text"
                id="add-tag-name"
                placeholder="Name Tag"
                required
                value={tag.name}
                onChange={handleName}
            />
            {error.name ? <span style={{ color: "red" }}>{error.name}</span> : null }
            <Button type="submit">Add Tag</Button>
        </Form>
    );

}

export default MyFormTag;