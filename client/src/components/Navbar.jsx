import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import BlueTechtonica from "../assets/BlueTechtonicaWord.png"

function MyNavBar(props) {

  const onStudentsClicked = () =>{
    props.navigate("students");
  }

  const onTagsClicked = () =>{
    props.navigate("tags");
  }


  return (
    <>
    <Navbar bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="/">
        <img
              src={BlueTechtonica}
              height="30"
              className="d-lg-inline-block"
              alt="React Bootstrap logo"
            />
        </Navbar.Brand>
        <Nav.Link onClick={onStudentsClicked}>Students</Nav.Link>
        <Nav.Link onClick={onTagsClicked}>Tags</Nav.Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Cristina Rodriguez</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default MyNavBar;