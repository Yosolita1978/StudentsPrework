import './App.css'
import MyNavBar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/sidebar';
import { useState } from "react";

function App() {

  const [page, setPage] = useState("");

  const navigate = (page) =>{
    setPage(page);
  }
  
  return (
    <div>
      <MyNavBar navigate={navigate} />
      {!page ? <span>Hello, this is an internal tool for Techtonica</span> : null }
      {page === "students" ? <Sidebar /> : null}
    </div>
  )
}

export default App
