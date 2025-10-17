import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="hero-wrapper">
      <div className="overlay"></div>
      <div className="hero-content glass-box text-white text-center px-4 py-5">
        <h1 className="display-3 fw-bold mb-3 animate-fade-in">Player Management System</h1>
        <p className="lead mb-3 animate-fade-in delay-1s">
         "Manage players, trainers, and managers, track evaluations, and organize matches—all in one powerful platform. Simplify scheduling, monitor performance, and develop future champions with seamless management of profiles, skills, training schedules, and progress.
        </p>
        <hr className="border-light w-50 mx-auto mb-4 animate-fade-in delay-2s" />
        <p className="mb-4 animate-fade-in delay-3s">
        Start managing players, trainers, and matches today—add, update, and track progress with ease.
        </p>
        <Link to="/players" className="btn btn-light text-dark fw-bold px-4 py-2 animate-fade-in delay-4s">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;