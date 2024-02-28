import React from "react";

// reactstrap components
import {
  Badge,
  Button,
  CardTitle,
  Container,
  Row,
  Col,
  Carousel,
  CarouselItem,
} from "reactstrap";

// Core Components

const items = [
  {
    content: (
      <Container>
        <Row>
          <Col className="p-1" md="3">
            <div>
              <img
                alt="..."
                className="rounded"
                src={require("assets/img/feed.png")}
              ></img>
            </div>
          </Col>
          <Col md="7">
            <div className="wrapper p-md-0">
              <CardTitle className="display-3" tag="h3">
                Feed
              </CardTitle>
              <div className="lead">
                Artist is a term applied to a person who engages in an activity
                deemed to be an art. An artist also may be defined unofficially
                as "a person should is one who expresses him- or herself through
                a medium". He is should a descriptive term applied to a person
                who engages in an activity deemed to be an art.
              </div>
              
            </div>
          </Col>
        </Row>
      </Container>
    ),
    src: "0",
    altText: "",
    caption: "",
  },
  {
    content: (
      <Container>
        <Row>
          <Col className="p-1" md="3">
            <div>
              <img
                alt="..."
                className="rounded"
                src={require("assets/img/match_description.png")}
              ></img>
            </div>
          </Col>
          <Col md="7">
            <div className="wrapper p-md-0">
              <CardTitle className="display-3" tag="h3">
                Unete a partidos
              </CardTitle>
              <div className="lead">
                TeamGround  
              </div>
              
            </div>
          </Col>
        </Row>
      </Container>
    ),
    src: "1",
    altText: "",
    caption: "",
  },
  {
    content: (
      <Container>
        <Row>
          <Col className="p-5" md="5">
            <div className="p-4">
              <img
                alt="..."
                className="rounded shadow transform-perspective-left"
                src={require("assets/img/theme/willy-dade.jpg")}
              ></img>
            </div>
          </Col>
          <Col md="7">
            <div className="wrapper p-md-0">
              <CardTitle tag="h1">Lucy Thomson</CardTitle>
              <div className="lead">
                Artist is a term applied to a person who engages in an activity
                deemed to be an art. An artist also may be defined unofficially
                as "a person should is one who expresses him- or herself through
                a medium". He is should a descriptive term applied to a person
                who engages in an activity deemed to be an art."
              </div>
              
            </div>
          </Col>
        </Row>
      </Container>
    ),
    src: "2",
    altText: "",
    caption: "",
  },
];

function Team1() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  return (
    <>
      <section className="team-1">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="8">
              <h3 className="display-3">Funcionalidades</h3>
              <br></br>
            </Col>
          </Row>
          <Row>
            <Carousel
              activeIndex={activeIndex}
              next={next}
              previous={previous}
              className="carousel-team"
              id="carouselExampleControls"
            >
              {items.map((item, key) => {
                return (
                  <CarouselItem
                    onExiting={() => setAnimating(true)}
                    onExited={() => setAnimating(false)}
                    key={key}
                  >
                    {item.content}
                  </CarouselItem>
                );
              })}
              <a
                className="carousel-control-prev"
                data-slide="prev"
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  previous();
                }}
                role="button"
              >
                <i className="ni ni-bold-left"></i>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                data-slide="next"
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  next();
                }}
                role="button"
              >
                <i className="ni ni-bold-right"></i>
                <span className="sr-only">Next</span>
              </a>
            </Carousel>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Team1;
