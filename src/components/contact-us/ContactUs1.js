import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Alert,
} from "reactstrap";

import { LinearProgress } from "@mui/material";
import axios from "axios";

// Core Components

function ContactUs1() {
  const [firstNameFocus, setFirstNameFocus] = React.useState("");
  const [lastNameFocus, setLastNameFocus] = React.useState("");
  const [emailFocus, setEmailFocus] = React.useState("");
  const [firstPsw, setFirstPsw] = React.useState("");
  const [secondPsw, setSecondPsw] = React.useState("");
  const [showLinearProgress, setShowLinearProgress] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertContent, setAlertContent] = React.useState("this is a test ");
  const [alertColor, setAlertColor] = React.useState("danger");
  const [completed, setCompleted] = React.useState(false);

  const handlePswReset = async () => {
    setShowLinearProgress(true);

    if (firstPsw.length === 0 || secondPsw.length === 0) {
      setAlertContent("Por favor ingresa tu nueva contrasena y confirmala");
      setShowAlert(true);
      setShowLinearProgress(false);
      return;
    }

    let body = {
      password: String(secondPsw),
    };

    let location = window.location.toString();
    let locationQuery = location.split("?")[1] ? location.split("?")[1] : null;

    await axios
      .put(`https://teamground.herokuapp.com/v1/users/reset/psw/${locationQuery}`, body)
      .then(() => {
        setCompleted(true);
        setShowLinearProgress(false);
      })
      .catch(() => {
        setAlertContent("Error restableciendo contrasena");
        setShowAlert(true);
        setShowLinearProgress(false);
        return;
      });
  };

  return (
    <>
      <div
        className="contactus-1 bg-dark"
        style={{
          backgroundImage: "url(" + require("assets/img/ill/1.svg") + ")",
        }}
      >
        <Container>
          {showLinearProgress ? <LinearProgress /> : <></>}

          <Alert color={alertColor} isOpen={showAlert}>
            <span className="alert-text">{alertContent}</span>
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              color="white"
              onClick={() => {
                setShowAlert(false);
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </Alert>

          <Row>
            {/* left side */}
            <Col
              className="d-flex justify-content-center flex-column"
              lg="5"
              md="5"
            >
              <div className="info info-horizontal">
                <div className="icon icon-shape icon-shape-white shadow rounded-circle text-white">
                  <i className="ni ni-key-25"></i>
                </div>
                <div className="description">
                  <h4 className="info-title text-white">
                    Restablecer contraseña
                  </h4>
                  <p className="description ml-3 text-white">
                    Escribe tu nueva contraseña, una vez esta sea restablecida
                    exitosamente, intenta ingresar de nuevo a la plataforma.
                  </p>
                </div>
              </div>
            </Col>

            {/* right side */}
            {!completed ? (
              <Col className="ml-auto mr-auto" lg="5" md="7">
                <Card className="card-contact card-raised">
                  <Form id="contact-form-1" method="post" role="form">
                    <CardBody>
                      <FormGroup className={emailFocus}>
                        <label>Nueva Contraseña</label>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Nueva contraseña aquí"
                            type="password"
                            onFocus={() => setEmailFocus("focused")}
                            onBlur={() => setEmailFocus("")}
                            onChange={(e) => setFirstPsw(e.target.value)}
                          ></Input>
                        </InputGroup>
                        <br></br>
                        <label>Confirmar Nueva Contraseña</label>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Confirmar nueva contraseña aquí"
                            type="password"
                            onFocus={() => setEmailFocus("focused")}
                            onBlur={() => setEmailFocus("")}
                            onChange={(e) => setSecondPsw(e.target.value)}
                          ></Input>
                        </InputGroup>
                      </FormGroup>

                      <Row>
                        <Col md="6">
                          <Button
                            className="pull-right"
                            color="success"
                            onClick={() => handlePswReset()}
                          >
                            Restablecer
                          </Button>
                        </Col>
                      </Row>
                    </CardBody>
                  </Form>
                </Card>
              </Col>
            ) : (
              <>
                <Col className="ml-auto mr-auto" lg="5" md="7">
                  <Card className="card-contact card-raised">
                    <CardBody>
                      <div
                        className={`icon icon-shape icon-shape-success  rounded-circle mb-4`}
                      >
                        <i className={"ni ni-check-bold"}></i>
                      </div>
                      <h6 className={`text-success text-uppercase`}>
                        Constrasena Restablecida
                      </h6>
                      <p className="description mt-3">
                        Tu contrasena se ha restablecido con exito
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default ContactUs1;
