import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet, Link, useNavigate } from "react-router-dom";

export default function LoggedNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("name", "");
    localStorage.setItem("surname", "");
    localStorage.setItem("avatar", "");
    localStorage.setItem("role", "");
    navigate("/login");
    window.location.reload();
  };

  const rolesString = localStorage.getItem("role");
  const userRoles = rolesString ? rolesString.split(",") : [];

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
              {userRoles.includes("Admin") ? (
                <Nav.Item>
                  <Link
                    to="/admin-panel"
                    className="link-light link-underline-opacity-0 d-flex align-items-center"
                  ></Link>
                </Nav.Item>
              ) : (
                <Nav.Item>
                  <Link
                    to="/user-panel"
                    className="link-light link-underline-opacity-0 d-flex align-items-center"
                  ></Link>
                </Nav.Item>
              )}
              <Nav.Item>
                <Link
                  to={
                    userRoles.includes("Admin") ? "/admin-panel" : "/user-panel"
                  }
                  className="link-light link-underline-opacity-0 d-flex align-items-center"
                >
                  <img
                    src={localStorage.getItem("avatar")}
                    alt="avatar"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                  />
                  Witaj, {localStorage.getItem("name")}{" "}
                  {localStorage.getItem("surname")}!
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
