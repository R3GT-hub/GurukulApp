import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext"; // Use named import for UserContext

export default function Header() {
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
  function home() {
   redirect ("/")
  }

  function resources(){
    redirect("/resources");
  }

  const username = userInfo?.username;

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        Gurukul
      </Link>
      <nav className="nav-links">
        {username ? (
          <>
            {(username === "mohit" || username === "saransh") && (
              <div style={{ display: "flex" }}>
                <button className="nav-link">
                  <Link to="/create" className="nav-link-text">
                    Post Job
                  </Link>
                </button>

                <button className="nav-link">
                  <Link to="/createresource" className="nav-link-text">
                    Post Resources
                  </Link>
                </button>
              </div>
            )}
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
            <Link to={"/resources"} className="logout-btn">
              Resources
            </Link>
            <Link to={"/"} className="logout-btn">
             Jobs
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
