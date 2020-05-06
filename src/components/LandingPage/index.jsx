import React from "react";
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import BlackLogo from "../../assets/images/logo-black.png";

const LandingPage = () => {
  return (
    <div className="pl-landing">
      <div className="pl-dark-overlay">
        <div className="container">
          <div className="row pl-landing-content">
            <div className="pl-logo">
              <img src={BlackLogo} alt="logo" className="" />
            </div>
            <div className="pl-landing-info">
              <p>Developed by - <b>Viduni Wickramarachchi</b></p>
              <p>Code Challenge - <b>React Redux</b></p>
              <p>Date - <b>06/05/2020</b></p>
            </div>
            <div className="pl-landing-button">
              <Link to="/dashboard">
                <Button>Navigate to Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(LandingPage);
