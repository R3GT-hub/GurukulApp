import React, { useContext, useEffect } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";
import "./Header.css";
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
    <div className="navbar">
      <div href="/" className="nav-logo">Gurukul</div>
      
        <div className="me-auto">
          <Link className="link" to="/">
            <div className="nav-title">Home</div>
          </Link>
          <Link className="link" to="/contactadmin"><div className="nav-title">Contact Admin</div></Link>
          {username ? (
            <>
              <Link className="link" to="/">
                <div className="nav-title">Jobs</div>
              </Link>
              <Link className="link" to="/resources">
                <div className="nav-title">Resources</div>
              </Link>
              {username === "saransh" ||
              username === "mohit" ||
              username === "pratyush" ? (
                <>
                  <Link className="link" to="/createresource">
                    <div className="nav-title">Add Resources</div>
                  </Link>
                  <Link className="link" to="/create">
                    <div className="nav-title">Add Jobs</div>
                  </Link>
                </>
              ) : null}
              <NavDropdown title={username} className="nav-title" id="basic-nav-dropdown">
                <NavDropdown.Item href="/" onClick={logout}>
                <div className="logout">Logout</div>
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <>
              <Link className="link" to="/login"><div className="nav-title">Login</div></Link>
              <Link className="link" to="/register"><div className="nav-title">Register</div></Link>
            </>
          )}
        </div>
     </div>
  );
}

export default Header;
