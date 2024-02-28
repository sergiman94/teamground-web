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
  Alert
} from "reactstrap";

const ls = require('local-storage')

// Core Components

export default function PricingTraining(props) {

  const BASE_LOCAL_URL = "https://teamground.herokuapp.com"
  const TRAININGS_URL = `${BASE_LOCAL_URL}/v1/trainings`
  const USERS_URL = `${BASE_LOCAL_URL}/v1/users`

  const [redirectToLogin, setRedirectToLogin] = useState(false)
  const [queryData, setQueryData] = useState(null)
  const [codedQuery, setCodedQuery] = useState(null) // codedQuery is the trainingKey
  const [guestUsername, setGuestUsername] = useState("")
  const [auth, setAuth] = useState(false)
  const [username, setUsername] = useState()
  const [showAlert, setShowAlert] = useState(false)
  const [alertContent, setAlertContent] = useState("this is a test ")
  const [alertColor, setAlertColor] = useState("default")
  const [userJoined, setUserJoined] = useState(false)
  const [showLinearProgress, setShowLinearProgress] = useState(false)

  const checkIfUserJoined = async () => {
    let userKey = await ls.get('user_id')
    if (auth) {
      await axios.get(`${TRAININGS_URL}/check/user/joined/${codedQuery}/${userKey}`).then(r => {
        setUserJoined(r.data.data)
      }).catch(error => {
        console.log(e)
        setShowAlert(true)
        setAlertColor("danger")
        setAlertContent("Ups ! Encontramos un error ")
      })
    }
  }

  const handleConfirm = async () => {
    setShowLinearProgress(true)
    if (auth) {
      let userKey = await ls.get('user_id')
      await axios.put(`${TRAININGS_URL}/join/${codedQuery}`, { newPlayerId: userKey }).then(r => {
        console.log(`user with id ${userKey} added to training`)

        setShowLinearProgress(false)
        setShowAlert(true)
        setAlertColor("success")
        setAlertContent("Super! te has unido al entrenamiento")

      }).catch(e => {
        console.log(e)
        setShowLinearProgress(false)
        setShowAlert(true)
        setAlertColor("danger")
        setAlertContent("Ups ! Encontramos un error uniendote al entrenamiento")
      })

    } else {
      if (guestUsername || String(guestUsername).length > 0) {
        await axios.post(`${USERS_URL}`, { username: guestUsername, password: nanoid(8), role: "guest" }).then(async (response) => {
          let userKey = response.data.data.key
          await axios.put(`${TRAININGS_URL}/join/${codedQuery}`, { newPlayerId: userKey }).then(r => {
            setShowLinearProgress(false)
            setShowAlert(true)
            setAlertColor("success")
            setAlertContent("Super! te has unido al entrenamiento")
            setUserJoined(true)
          }).catch(e => {
            console.log(e)
            setShowLinearProgress(false)
            setShowAlert(true)
            setAlertColor("danger")
            setAlertContent("Ups ! Encontramos un error uniendote al entrenamiento")
          })
        }).catch(e => {
          console.log(e)
          setShowLinearProgress(false)
          setShowAlert(true)
          setAlertColor("danger")
          setAlertContent("Ups ! Encontramos un error uniendote al entrenamiento")
        })
      } else {
        setShowLinearProgress(false)
        setShowAlert(true)
        setAlertColor("danger")
        setAlertContent("Por favor ingresa tu nombre para unirte al entrenamiento")
      }
    }
  }

  const getData = async () => {
    let hasAuth = Number(window.location.toString().search("auth")) > 0 ? true : false
    setAuth(hasAuth)
    let location = window.location.toString()
    let locationQuery = ''

    if (!hasAuth) {
      locationQuery = location.split('?')[1] ? location.split('?')[1] : null
      setCodedQuery(locationQuery)

    } else {
      locationQuery = location.split('?')[1] ? location.split('?')[1].split('&')[0] : null
      setCodedQuery(locationQuery)

      let userKey = await ls.get('user_id')

      await axios.get(`${USERS_URL}/${userKey}`).then(r => {
        setUsername(r.data.data.displayName)
      })
    }

    if (String(locationQuery).length) {
      await axios.get(`${TRAININGS_URL}/${locationQuery}`).then(data => {
        setQueryData(data.data.data)
      }).catch(error => console.log(`error getting training data -> ${error}`))
    }
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    checkIfUserJoined()
  })

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
          {showAlert ?
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
                onClick={() => { setShowAlert(false) }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </Alert>
            : <></>}
          {userJoined ? <></> : <Row>
            <Col className="mx-auto text-center my-5" lg="8">
              <h3 className="display-3"> ¡ {auth ? `${username} te ` : 'Te'} han invitado a un entrenamiento !</h3>
            </Col>
          </Row>}
          <Row>
            <Col className="pr-md-0" md="5">
              {userJoined ? <Card className="card-pricing bg-gradient-success border-0 text-center mb-4">
                <CardHeader className="bg-transparent">
                  <h6 className="text-uppercase ls-1 text-white py-3 mb-0">
                    {userJoined ? "¡ Ya estas unido al entrenamiento ¡" : " ¡ Este entrenamiento ya está lleno !"}
                  </h6>
                </CardHeader>
                <CardBody>
                  {/* <div className="display-2 text-white">$68</div>
                  <span className="text-white">per month</span> */}
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
                            {userJoined ? "Revisa los detalles del entrenamiento" : "Descarga nuestra app para ver mas entrenamientos"}
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
                            {userJoined ? "No olvides estar puntual en la cancha" : "Unete al entrenamiento que te guste"}
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
                : <Card className="card-pricing text-center bg-dark">
                  <CardHeader className="bg-transparent">
                    <h4 className=" ls-1 text-white py-3 mb-0">
                      Pasos para confirmar tu asistencia
                    </h4>
                  </CardHeader>
                  <CardBody className="px-lg-6">
                    {userJoined? <></> : <ul className="list-unstyled my-4">
                      <li>
                        <div className="d-flex align-items-center">
                          <div>
                            <div className="icon icon-xs icon-shape icon-shape-primary shadow rounded-circle">
                              <i className="ni ni-folder-17 text-white"></i>
                            </div>
                          </div>
                          <div>
                            <span className="pl-2 text-sm">
                              Revisa los detalles del entreno
                            </span>
                          </div>
                        </div>
                      </li>
                      {auth ? <></> : <li>
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
                      </li>}
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
                    </ul>}

                    {auth ? <></> : <Input
                      placeholder="Nombre"
                      type="text"
                      onChange={(e) => setGuestUsername(e.target.value)}
                    ></Input>}

                    <br />

                    <Button className="mb-3" color="success" type="button" onClick={() => handleConfirm()}>
                      Confirmar
                    </Button>

                  </CardBody>
                  <CardFooter className="bg-transparent">
                    {auth || userJoined ? <></> : <a
                      className="text-success"
                      href={`https://teamground.web.app/login?${codedQuery}&training`}
                      onClick={(e) => handleLogin()}
                    >
                      Haz click aqui para unirte con tu usuario
                    </a>}
                  </CardFooter>
                </Card>}
            </Col>
            <Col className="pl-md-0" md="7">
              <Card className="card-pricing border-0 text-center my-5">
                <CardHeader className="bg-transparent">
                  <h4 className=" ls-1 text-black py-3 mb-0">
                    Detalles del entrenamiento
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
                        <td>{queryData ? queryData.date : '...'}</td>
                        <td>{queryData ? queryData.hour : '...'}</td>
                      </tr>
                      
                    </tbody>
                  </Table>
                </CardBody>
                <CardFooter>

                  {auth ? <></> : <a
                    className="text-primary"
                    href={`https://teamground.web.app/login?${codedQuery}&registration=true`}
                    onClick={(e) => handleCreateAccount()}
                  >
                    Crear una cuenta
                  </a>}

                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

