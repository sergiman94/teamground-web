import React from "react";

// reactstrap components
import { Button, Card, CardBody, Container, Row, Col } from "reactstrap";
import axios from "axios";

// Core Components

function Feature7() {

  const [color, setColor] = React.useState("success")
  const [status, setStatus] = React.useState("Correo Confirmado")
  const [iconName, setIconName] = React.useState("ni ni-check-bold")
  const [content, setContent] = React.useState("Crea partidos, unete a equipos y disfruta de lo que tenemos para ti en nuestra app TeamGround ")

  React.useEffect(() => {
    sendConfirmation()
  }, [])

  const sendConfirmation = async () => { 
    let location = window.location.toString()
    let locationQuery = location.split('?')[1] ? location.split('?')[1] : null

    if (locationQuery) {
      await axios.put(`https://teamground.herokuapp.com/v1/users/confirm/mail/${locationQuery}`).catch(() => {
        setColor("warning")
        setIconName("ni ni-fat-remove")
        setStatus("Correo no Confirmado")
        setContent("Ha ocurrido un error confirmando tu correo, intentalo de nuevo refrescando esta pagina")
      })      
    } else {
      setColor("warning")
      setIconName("ni ni-fat-remove")
      setStatus("Correo no Confirmado")
      setContent("Ha ocurrido un error confirmando tu correo, intentalo de nuevo refrescando esta pagina")
    }
  }

  return (
    <>
      <div className="section features-7">
        <Container>
          <Row className="justify-content-center mt-5">
            <Col lg="12">
              <Row className="row-grid">
                <Col lg="4">
                  
                </Col>
                <Col lg="4">
                  <Card className="card-lift--hover shadow border-0">
                    <CardBody className="py-5">
                      <div className={`icon icon-shape icon-shape-${color}  rounded-circle mb-4`}>
                        <i className={iconName}></i>
                        {/* <i className="ni ni-fat-remove"></i> */}
                      </div>
                      <h6 className={`text-${color} text-uppercase`}>
                        {status}
                      </h6>
                      <p className="description mt-3">
                        {content}
                      </p>
                      {color === "success" ? <Button
                        className="mt-4"
                        color={color}
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        Conocer más
                      </Button> : <></>}
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="4">
                  
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Feature7;
