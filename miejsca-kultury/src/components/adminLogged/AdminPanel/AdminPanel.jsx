import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BootstrapImage from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminPanel() {
  const [activeModal, setActiveModal] = useState(null);

  const [email, setEmail] = useState("");

  const handleClose = () => setActiveModal(null);
  const handleShow = (modalId) => setActiveModal(modalId);

  const addAdmin = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const logobj = { email };
      const response = await fetch("http://localhost:5000/api/add-admin-role", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(logobj),
      });

      const data = await response.json();
      if (!response.ok) {
        const errorMessage = data.title;
        toast.error(errorMessage);

        if (data.errors) {
          Object.entries(data.errors).forEach(([key, value]) => {
            toast.error(value.join(", "));
          });
        }
      } else {
        const successMessage = data.message;
        toast.success(successMessage);
      }
    } catch (error) {
      console.error("Failed to add admin role:", error);
      toast.error("Nie udało się nadać roli administratora: " + error.message);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    const img = new Image();

    reader.onload = (e) => {
      img.onload = async () => {
        if (img.width > 400 || img.height > 400) {
          toast.error("Wymiary obrazu nie mogą przekraczać 400x400 pikseli");
          return;
        }

        const formData = new FormData();
        formData.append("photo", file);

        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            "http://localhost:5000/api/upload-profile-avatarImage",
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            }
          );

          const data = await response.json();
          if (!response.ok) {
            const errorMessage = data.title;
            toast.error(errorMessage);

            if (data.errors) {
              Object.entries(data.errors).forEach(([key, value]) => {
                toast.error(value.join(", "));
              });
            }
          } else {
            const successMessage = data.message;
            //session.avatar = data.message;
            localStorage.setItem("avatar", data.message);
            toast.success(successMessage);

            handleClose();
            window.location.reload();
          }
        } catch (error) {
          console.error("Nie udało się przesłać obrazu:", error);
          toast.error("Nie udało się przesłać obrazu: " + error.message);
        }
      };
      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  };

  return (
    <Container className="mt-5">
      <Row className="align-items-center">
        <Col sm={8}>
          <BootstrapImage
            src={localStorage.getItem("avatar")}
            roundedCircle
            key={localStorage.getItem("avatar")}
          />
        </Col>
        <Col
          sm={4}
          className="d-flex align-items-center"
          style={{ fontSize: "45px", color: "#f8f9fa", fontWeight: "bold" }}
        >
          Panel Admina: {localStorage.getItem("name")}{" "}
          {localStorage.getItem("surname")}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col sm className="d-flex align-items-center justify-content-center">
          <Button variant="primary" onClick={() => handleShow("changePhoto")}>
            Zmień zdjęcie
          </Button>

          <Modal
            show={activeModal === "changePhoto"}
            onHide={handleClose}
            centered
          >
            <Modal.Body>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Zamknij
              </Button>
              {localStorage.getItem("avatar") && (
                <Button variant="danger"> Usuń zdjęcie</Button>
              )}
            </Modal.Footer>
          </Modal>
        </Col>

        <Col sm className="d-flex align-items-center justify-content-center">
          <Button variant="primary" onClick={() => handleShow("PrawaAdmin")}>
            Nadaj prawa administratora
          </Button>
          <Modal
            show={activeModal === "PrawaAdmin"}
            onHide={handleClose}
            centered
          >
            <Modal.Body>
              <Form onSubmit={addAdmin}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    Podaj adres email użytkownika, by nadać mu prawa
                    administratora
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    required
                  />
                </Form.Group>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Anuluj
                  </Button>
                  <Button variant="primary" type="submit" onClick={handleClose}>
                    Zapisz
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}

export default AdminPanel;
