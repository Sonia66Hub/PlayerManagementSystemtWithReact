import React from "react";
import {BrowserRouter as Router,Routes,Route,Link,Navigate,
} from "react-router-dom";

import { Container, Navbar, Nav } from "react-bootstrap";
import ManagerList from "./components/ManagerList";
import ManagerForm from "./components/ManagerForm";
// import ManagerDetails from "./components/ManagerDetails";
import './HeroSection.css';


function App() {
  return (
    <>
      
      <Nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Player Management
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
               {/* <li className="nav-item">
                <Link className="nav-link" to="/managers">
                  Home
                </Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to="/managers">
                  Manager List
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/managers/create">
                  Add Manager
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Nav>

      <div className="container mt-4">
        <Routes>
          <Route
          path="/"
          element={
            <div className="hero-wrapper">
              <div className="overlay"></div>
              <div className="hero-content glass-box text-white text-center px-4 py-5">
                <h1 className="display-3 fw-bold mb-3 animate-fade-in">Player Management System</h1>
                <p className="lead mb-3 animate-fade-in delay-1s">
                  Seamlessly manage player profiles, trainer profiles, trainer skills, manager profiles, training schedules, and performance.
                </p>
                <hr className="border-light w-50 mx-auto mb-4 animate-fade-in delay-2s" />
                <p className="mb-4 animate-fade-in delay-3s">
                  Get started now to add, view, or update players and their training assignments.
                </p>
                <Link to="/managers" className="btn btn-light text-dark fw-bold px-4 py-2 animate-fade-in delay-4s">
                  Get Started
                </Link>
              </div>
            </div>
          }
        />
          <Route path="/managers" element={<ManagerList />} />
          <Route path="/managers/create" element={<ManagerForm />} />
          <Route path="/managers/edit/:id" element={<ManagerForm />} />
          {/* <Route path="/managers/:id" element={<ManagerDetails />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
