import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet, Link } from "react-router-dom";
import { useSession } from "../../SessionContext";

export default function LoggedNav() {
  const { session } = useSession();
  const [avatar, setAvatar] = useState(session.avatar);

  useEffect(() => {
    setAvatar(session.avatar);
  }, [session.avatar]);

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
              {/* Dodaj inne elementy nawigacyjne dla zalogowanych użytkowników */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}
