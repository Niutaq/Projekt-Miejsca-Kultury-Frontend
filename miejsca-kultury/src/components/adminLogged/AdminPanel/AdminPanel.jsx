import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BootstrapImage from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useSession } from "../../SessionContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminPanel() {
  const { session, updateSession } = useSession();
  const [activeModal, setActiveModal] = useState(null);
  const [selectedImage, setSelectedImage] = useState(session.avatar);
  const [email, setEmail] = useState("");

  useEffect(() => {
    setSelectedImage(session.avatar);
  }, [session.avatar]);

  const handleClose = () => setActiveModal(null);
  const handleShow = (modalId) => setActiveModal(modalId);

  const addAdmin = async (event) => {
    event.preventDefault();
    const token = session.token;

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
      toast.error("Failed to add admin role: " + error.message);
    }
  };

  //   const handleImageUpload = (event) => {
  //     const file = event.target.files[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         const img = new Image();
  //         img.src = reader.result;
  //         img.onload = async () => {
  //           if (img.width === 400 && img.height === 400) {
  //             setSelectedImage(reader.result);

  //             const formData = new FormData();
  //             formData.append("photo", file);

  //             const token = session.token;

  //             try {
  //               const response = await fetch(
  //                 "http://localhost:5000/api/upload-profile-avatarImage",
  //                 {
  //                   method: "PUT",
  //                   body: formData,
  //                   headers: {
  //                     Authorization: `Bearer ${token}`,
  //                   },
  //                 }
  //               );

  //               const data = await response.json();
  //               const message = JSON.stringify(data);
  //               const messageToDisplay = JSON.parse(message);
  //               if (response.ok) {
  //                 localStorage.setItem("avatar", data.avatarUrl);
  //                 updateSession((prevSession) => ({
  //                   ...prevSession,
  //                   avatar: data.avatarUrl,
  //                 }));
  //                 handleClose();
  //               } else {
  //                 toast.error(`${messageToDisplay.title}`);
  //                 Object.entries(data.errors).forEach(([key, value]) => {
  //                   toast.error(value.join(", "));
  //                 });
  //               }
  //             } catch (error) {
  //               console.error("Błąd:", error.message);
  //               alert("Wystąpił błąd podczas przesyłania zdjęcia.");
  //             }
  //           } else {
  //             alert("Wybierz zdjęcie o wymiarach 400x400 pikseli.");
  //           }
  //         };
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };

  //   const handleRemoveImage = async () => {
  //     try {
  //       const response = await fetch("/api/remove-profile-picture", {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ filename: selectedImage.split("/").pop() }),
  //       });
  //       if (!response.ok) throw new Error("Network response was not ok.");
  //       const defaultImage = "https://dummyimage.com/400x400/000/fff";
  //       localStorage.setItem("avatar", defaultImage);
  //       updateSession((prevSession) => ({
  //         ...prevSession,
  //         avatar: defaultImage,
  //       }));
  //       setSelectedImage(defaultImage);
  //     } catch (error) {
  //       console.error("Error removing image:", error);
  //       alert("Wystąpił błąd podczas usuwania zdjęcia.");
  //     }
  //   };

  return (
    <Container className="mt-5">
      <Row className="align-items-center">
        <Col sm={8}>
          <BootstrapImage
            src={selectedImage}
            roundedCircle
            key={selectedImage}
          />
        </Col>
        <Col
          sm={4}
          className="d-flex align-items-center"
          style={{ fontSize: "50px", color: "#f8f9fa", fontWeight: "bold" }}
        >
          {session.name} {session.surname}
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
                //onChange={handleImageUpload}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Zamknij
              </Button>
              {selectedImage && <Button variant="danger"> Usuń zdjęcie</Button>}
            </Modal.Footer>
          </Modal>
        </Col>
        <Col sm className="d-flex align-items-center justify-content-center">
          <Button variant="primary" onClick={() => handleShow("resetPassword")}>
            Resetuj hasło
          </Button>

          <Modal
            show={activeModal === "resetPassword"}
            onHide={handleClose}
            centered
          >
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Stare hasło</Form.Label>
                  <Form.Control autoFocus />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Nowe hasło</Form.Label>
                  <Form.Control autoFocus />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Powtórz nowe hasło</Form.Label>
                  <Form.Control autoFocus />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Anuluj
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Zapisz
              </Button>
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
