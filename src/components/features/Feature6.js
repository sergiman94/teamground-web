import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// Core Components

function Feature6() {
  return (
    <>
      <div className="section features-6">
        <Container>
          <Row className="align-items-center">
            <Col lg="6">
              <div className="info info-horizontal info-hover-primary">
                <div className="icon icon-shape icon-shape-info rounded-circle text-white">
                  <i className="ni ni-html5 text-info"></i>
                </div>
                <div className="description pl-4">
                  <h5 className="title">Para Entrenadores</h5>
                  <p>
                    Crea equipos y lleva un historial de los jugadores que han participado en tus entrenamientos,
                    comparte tu equipo a tu comunidad y agenda los entrenamientos en diferentes establecimientos deportivos
                  </p>
                  
                </div>
              </div>
              <div className="info info-horizontal info-hover-primary">
                <div className="icon icon-shape icon-shape-info rounded-circle text-white">
                  <i className="ni ni-app text-info"></i>
                </div>
                <div className="description pl-4">
                  <h5 className="title">Para Establecimientos Deportivos</h5>
                  <p>
                    TeamGround ayuda a apalancar la publicidad de tu establecimiento deportivo en la comunidad
                    facilitando las reservas con un sistema rapido y efectivo, tambien comparte las imagenes de tu
                    establecimiento para así invitar a mas jugadores.
                  </p>
                </div>
              </div>
              <div className="info info-horizontal info-hover-primary">
                <div className="icon icon-shape icon-shape-info rounded-circle text-white">
                  <i className="ni ni-bell-55 text-info"></i>
                </div>
                <div className="description pl-4">
                  <h5 className="title">Para Jugadores</h5>
                  <p>
                    Conectate y disfruta con más jugadores en la comunidad, TeamGround permite crear y unirte a partidos, 
                    entrenamientos como tambien compartirlos para que puedas interactuar con mas perosnas amantes al deporte.
                  </p>
                 
                </div>
              </div>
            </Col>
            <Col className="mx-md-auto" lg="6" xs="10">
              <img
                alt="..."
                className="ml-lg-5"
                src={require("assets/img/ill/ill.png")}
                width="100%"
              ></img>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Feature6;
