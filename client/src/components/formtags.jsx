import React, { useState } from 'react'
import { Button, Form } from "react-bootstrap";

const MyFormTag = (props) => {
    const { initialTag = { id: null, name: "" } } = props;


    // This is the oroginal State with not initial student 
    const [tag, setTag] = useState(initialTag);

    //create functions that handle the event of the user typing into the form
    const handleName = (event) => {
        const name = event.target.value;
        setTag((tag) => ({ ...tag, name }));

    };

    //TO-DO: A function to handle the post request
    // const postTag = (newStudent) => {
    //     return fetch("http://localhost:8080/api/students", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(newStudent),
    //     })
    //         .then((response) => {
    //             return response.json();
    //         })
    //         .then((data) => {
    //             //console.log("From the post ", data);
    //             props.onSaveStudent(data);
    //             setStudent({ id: null, firstname: "", lastname: "" });
    //         });
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(tag);
        //props.onSaveTag(tag);
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
            <Button type="submit">Add a Tag</Button>
        </Form>
    );

}

export default MyFormTag;