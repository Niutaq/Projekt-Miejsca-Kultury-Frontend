import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useSession } from "../../SessionContext";

export default function LoggedNav() {
  const { session, updateSession } = useSession();
  const [avatar, setAvatar] = useState(session.avatar);
  const navigate = useNavigate();

  useEffect(() => {
    setAvatar(session.avatar);
  }, [session.avatar]);

  const handleLogout = () => {
    updateSession({
      name: "",
      surname: "",
      avatar: "",
      token: null,
      //isAdmin: false,
    });
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="fixed top">
        <Container>
          <Navbar.Brand>
            <Link className="link-light link-underline-opacity-0" to={"/"}>
              Miejsca Kultury
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center">
              <Nav.Item>
                <Link
                  to="/admin-panel"
                  className="link-light link-underline-opacity-0 d-flex align-items-center"
                >
                  <img
                    src={avatar}
                    alt="avatar"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                  />
                  Witaj, {session.name} {session.surname}!
                </Link>
              </Nav.Item>
              <Nav.Item>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-light ms-3"
                >
                  Wyloguj się
                </button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}
