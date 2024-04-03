import React, { useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';

function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <div className='navbar' bg="dark" variant="dark" expand="lg" sticky="top">
      <div>
        <div href="/">Gurukul</div>
        <div aria-controls="basic-navbar-nav" />
        <div id="basic-navbar-nav">
          <div className="me-auto">
            <Link to="/">Home</Link>
            <Link to="/contactadmin">Contact Admin</Link>
            {username ? (
              <>
                <Link to="/">Jobs</Link>
                <Link to="/resources">Resources</Link>
                {username === "saransh" || username === "mohit" || username === "pratyush" ? (
                  <>
                    <Link to="/createresource">Add Resources</Link>
                    <Link to="/create">Add Jobs</Link>
                  </>
                ) : null}
                <NavDropdown title={username} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/" onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
