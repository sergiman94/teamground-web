/*eslint-disable */

import { LinearProgress } from "@mui/material";
import axios from "axios";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Container,
  Row,
  Col,
  Input,
  Alert,
} from "reactstrap";

const ls = require("local-storage");

// Core Components

export default function Pricing3(props) {
  const BASE_LOCAL_URL = "https://teamground.herokuapp.com";
  const MATCHES_URL = `${BASE_LOCAL_URL}/v1/matches`;
  const USERS_URL = `${BASE_LOCAL_URL}/v1/users`;
  const FIELDS_URL = `${BASE_LOCAL_URL}/v1/fields`;

  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [queryData, setQueryData] = useState(null);
  const [codedQuery, setCodedQuery] = useState(null);
  const [guestUsername, setGuestUsername] = useState("");
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("this is a test ");
  const [alertColor, setAlertColor] = useState("default");
  const [userJoined, setUserJoined] = useState(false);
  const [matchFull, setMatchFull] = useState(false);
  const [showLinearProgress, setShowLinearProgress] = useState(false);
  const [field, setField] = useState(null)

  const checkIfUserJoined = async () => {
    let userKey = await ls.get("user_id");
    if (auth) {
      await axios
        .get(`${MATCHES_URL}/check/user/joined/${codedQuery}/${userKey}`)
        .then((r) => {
          setUserJoined(r.data.data);
        })
        .catch((error) => {
          console.log(error);
          setShowAlert(true);
          setAlertColor("danger");
          setAlertContent("Ups ! Encontramos un error ");
        });
    }
  };

  const handleConfirm = async () => {
    setShowLinearProgress(true);
    if (auth) {
      let userKey = await ls.get("user_id");
      await axios
        .put(`${MATCHES_URL}/newplayer/${codedQuery}`, { newPlayerId: userKey })
        .then((r) => {
          console.log(`user with id ${userKey} added to match`);

          setShowLinearProgress(false);
          setShowAlert(true);
          setAlertColor("success");
          setAlertContent("Super! te has unido al partido");
        })
        .catch((e) => {
          console.log(e);
          setShowLinearProgress(false);
          setShowAlert(true);
          setAlertColor("danger");
          setAlertContent("Ups ! Encontramos un error uniendote al partido");
        });
    } else {
      if (guestUsername || String(guestUsername).length > 0) {
        await axios
          .post(`${USERS_URL}`, {
            username: guestUsername,
            password: nanoid(8),
            role: "guest",
          })
          .then(async (response) => {
            let userKey = response.data.data.key;
            await axios
              .put(`${MATCHES_URL}/newplayer/${codedQuery}`, {
                newPlayerId: userKey,
              })
              .then((r) => {
                setShowLinearProgress(false);
                setShowAlert(true);
                setAlertColor("success");
                setAlertContent("Super! te has unido al partido");
                setUserJoined(true);
              })
              .catch((e) => {
                console.log(e);
                setShowLinearProgress(false);
                setShowAlert(true);
                setAlertColor("danger");
                setAlertContent(
                  "Ups ! Encontramos un error uniendote al partido"
                );
              });
          })
          .catch((e) => {
            console.log(e);
            setShowLinearProgress(false);
            setShowAlert(true);
            setAlertColor("danger");
            setAlertContent("Ups ! Encontramos un error uniendote al partido");
          });
      } else {
        setShowLinearProgress(false);
        setShowAlert(true);
        setAlertColor("danger");
        setAlertContent("Por favor ingresa tu nombre para unirte al partido");
      }
    }
  };

  const getData = async () => {
    let hasAuth =
      Number(window.location.toString().search("auth")) > 0 ? true : false;
    setAuth(hasAuth);
    let location = window.location.toString();
    let locationQuery = "";

    if (!hasAuth) {
      locationQuery = location.split("?")[1] ? location.split("?")[1] : null;
      setCodedQuery(locationQuery);

      await axios.get(`${MATCHES_URL}/${locationQuery}`).then((data) => {
        let match = data.data.data;
        if (match.confirmedPlayers.length >= Number(match.players)) {
          setMatchFull(true);
        }
      });
    } else {
      locationQuery = location.split("?")[1]
        ? location.split("?")[1].split("&")[0]
        : null;
      setCodedQuery(locationQuery);

      let userKey = await ls.get("user_id");

      await axios.get(`${USERS_URL}/${userKey}`).then((r) => {
        setUsername(r.data.data.username);
      });
    }

    if (String(locationQuery).length) {
      await axios
        .get(`${MATCHES_URL}/${locationQuery}`)
        .then((data) => {
          setQueryData(data.data.data);
        })
        .catch((error) => console.log(`error getting match data -> ${error}`));
    }
  };

  const getField = async () => {
    if (queryData.field) {
      let fieldData = (await axios.get(`${FIELDS_URL}/${queryData.field}`)).data.data
      setField(fieldData)
    } 
  }

  useEffect(() => {
    getData();
    getField()
  }, []);

  useEffect(() => {
    checkIfUserJoined();
  });

  return (
    <>
      <section
        className="pricing-3"
        id="pricing-4"
        style={{
          backgroundImage: "url(" + require("assets/img/ill/1.svg") + ")",
        }}
      >
        <Container>
          {/* LINEAR PROGRESS BAR  */}
          {showLinearProgress ? <LinearProgress /> : <></>}

          {/* ALERT  */}
          {showAlert ? (
            <Alert color={alertColor} isOpen={showAlert}>
              <span className="alert-text">
                {/* <strong>Primary!</strong>{" "} */}
                {alertContent}
              </span>
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
          ) : (
            <></>
          )}
          {userJoined || matchFull ? (
            <></>
          ) : (
            <Row>
              <Col className="mx-auto text-center my-5" lg="8">
                <h3 className="display-3">
                  {" "}
                  ¡ {auth ? `${username} te ` : "Te"} han invitado a un partido
                  !
                </h3>
              </Col>
            </Row>
          )}
          <Row>
            <Col className="pr-md-0" md="5">
              {/* if user joined or match is full */}
              {userJoined || matchFull ? (
                // card when user has joined or the match is full
                <Card className="card-pricing bg-gradient-success border-0 text-center mb-4">
                  {/* card header wether user is joined or not */}
                  <CardHeader className="bg-transparent">
                    <h6 className="text-uppercase ls-1 text-white py-3 mb-0">
                      {userJoined
                        ? "¡ Ya estas unido al partido ¡"
                        : " ¡ Este partido ya está lleno !"}
                    </h6>
                  </CardHeader>
                  {/* match instructions and inputs */}
                  <CardBody>
                    <ul className="list-unstyled my-4">
                      <li>
                        <div className="d-flex align-items-center">
                          <div>
                            <div className="icon icon-xs icon-shape bg-white shadow rounded-circle text-success">
                              <i className="ni ni-book-bookmark"></i>
                            </div>
                          </div>
                          <div>
                            <span className="pl-2 text-sm text-white">
                              {userJoined
                                ? "Revisa los detalles del partido"
                                : "Descarga nuestra app para ver mas partidos"}
                            </span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex align-items-center">
                          <div>
                            <div className="icon icon-xs icon-shape bg-white shadow rounded-circle text-success">
                              <i className="ni ni-diamond"></i>
                            </div>
                          </div>
                          <div>
                            <span className="pl-2 text-sm text-white">
                              {userJoined
                                ? "No olvides estar puntual en la cancha"
                                : "Unete al partido que te guste"}
                            </span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex align-items-center">
                          <div>
                            <div className="icon icon-xs icon-shape bg-white shadow rounded-circle text-success">
                              <i className="ni ni-chart-pie-35"></i>
                            </div>
                          </div>
                          <div>
                            <span className="pl-2 text-sm text-white">
                              ¡ Diviertete !
                            </span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </CardBody>
                </Card>
              ) : (
                // default card render when match is available
                <Card className="card-pricing text-center bg-dark">
                  {/* title */}
                  <CardHeader className="bg-transparent">
                    <h4 className=" ls-1 text-white py-3 mb-0">
                      Pasos para confirmar tu asistencia
                    </h4>
                  </CardHeader>
                  {/* match instructions and inputs */}
                  <CardBody className="px-lg-6">
                    {userJoined || matchFull ? (
                      <></>
                    ) : (
                      <ul className="list-unstyled my-4">
                        <li>
                          <div className="d-flex align-items-center">
                            <div>
                              <div className="icon icon-xs icon-shape icon-shape-primary shadow rounded-circle">
                                <i className="ni ni-folder-17 text-white"></i>
                              </div>
                            </div>
                            <div>
                              <span className="pl-2 text-sm">
                                Revisa los detalles del partido
                              </span>
                            </div>
                          </div>
                        </li>
                        {auth ? (
                          <></>
                        ) : (
                          <li>
                            <div className="d-flex align-items-center">
                              <div>
                                <div className="icon icon-xs icon-shape icon-shape-primary shadow rounded-circle">
                                  <i className="ni ni-camera-compact text-white"></i>
                                </div>
                              </div>
                              <div>
                                <span className="pl-2 text-sm">
                                  Ingresa tu nombre
                                </span>
                              </div>
                            </div>
                          </li>
                        )}
                        <li>
                          <div className="d-flex align-items-center">
                            <div>
                              <div className="icon icon-xs icon-shape icon-shape-primary shadow rounded-circle">
                                <i className="ni ni-chart-pie-35 text-white"></i>
                              </div>
                            </div>
                            <div>
                              <span className="pl-2 text-sm">
                                Haz click en confirmar
                              </span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    )}

                    {auth ? (
                      <></>
                    ) : (
                      <Input
                        placeholder="Nombre"
                        type="text"
                        onChange={(e) => setGuestUsername(e.target.value)}
                      ></Input>
                    )}

                    <br />

                    {userJoined || matchFull ? (
                      <></>
                    ) : (
                      <Button
                        className="mb-3"
                        color="success"
                        type="button"
                        onClick={() => handleConfirm()}
                      >
                        Confirmar
                      </Button>
                    )}
                  </CardBody>
                  {/* login or registration redirection */}
                  <CardFooter className="bg-transparent">
                    {auth || userJoined || matchFull ? (
                      <></>
                    ) : (
                      <a
                        className="text-success"
                        href={`https://teamground.web.app/login?${codedQuery}`}
                        onClick={(e) => handleLogin()}
                      >
                        Haz click aqui para unirte con tu usuario
                      </a>
                    )}
                  </CardFooter>
                </Card>
              )}
            </Col>
            <Col className="pl-md-0" md="7">
              <Card className="card-pricing border-0 text-center my-5">
                <CardHeader className="bg-transparent">
                  <h4 className=" ls-1 text-black py-3 mb-0">
                    Detalles del partido
                  </h4>
                </CardHeader>
                <CardBody className="px-lg-6">
                  {/* <div className="card-description">
                    Ubicacion: Canchas la bombonera
                  </div>
                  <div className="card-description">
                    Fecha: Miercoles 20 de Octubre
                  </div> */}
                  <Table className="table-bordered mt-3">
                    <tbody>
                      <tr>
                        <td>{field ? field.field : "..."}</td>
                        <td>{field ? field.address : "..."}</td>
                      </tr>
                      <tr>
                        <td>{queryData ? queryData.date : "..."}</td>
                        <td>{queryData ? queryData.hour : "..."}</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
                <CardFooter>
                  {auth ? (
                    <></>
                  ) : (
                    <a
                      className="text-black"
                      href={`https://teamground.web.app/login?${codedQuery}&registration=true`}
                      onClick={(e) => handleCreateAccount()}
                    >
                      Crear una cuenta
                    </a>
                  )}
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
