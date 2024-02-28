import React from "react";

// reactstrap components
import { Badge, Container, Row, Col } from "reactstrap";

// Core Components

function Feature1() {
  return (
    <>
      <div className="section features-1">
        <Container>
          <Row>
            <Col className="mx-auto text-center" md="8">
              {/* <Badge className="mb-3" color="primary" pill>
                Insight
              </Badge> */}
              <h3 className="display-3">Que Puedo Hacer Con TeamGround ? </h3>
              <br></br>
              <br></br>
              <br></br>
              {/* <p className="lead">
                The time is now for it to be okay to be great. For being a
                bright color. For standing out.
              </p> */}
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <div className="info">
                <div className="icon icon-lg icon-shape icon-shape-primary shadow rounded-circle">
                  <i className="ni ni-settings-gear-65"></i>
                </div>
                <h6 className="info-title text-uppercase text-primary">
                  Crear Contenido
                </h6>
                <p className="description opacity-8">
                  Comparte imagenes y videos de tus practicas deportivas, entrenamientos y ultimas noticias.
                </p>
                
              </div>
            </Col>
            <Col md="4">
              <div className="info">
                <div className="icon icon-lg icon-shape icon-shape-success shadow rounded-circle">
                  <i className="ni ni-atom"></i>
                </div>
                <h6 className="info-title text-uppercase text-success">
                  Reservar partidos en establecimientos
                </h6>
                <p className="description opacity-8">
                  Reserva partidos en los establecimientos deportivos de tu ciudad asi como
                  tambien los entrenamientos de tu equipo o de los demas en la comunidad.
                </p>
              </div>
            </Col>
            <Col md="4">
              <div className="info">
                <div className="icon icon-lg icon-shape icon-shape-warning shadow rounded-circle">
                  <i className="ni ni-world"></i>
                </div>
                <h6 className="info-title text-uppercase text-warning">
                  Crear y unirte a equipos
                </h6>
                <p className="description opacity-8">
                  Con TeamGround puedes crear equipos y entrenamientos, puedes unirte a otros equipos y reservar partidos en establecimientos deportivos
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Feature1;
