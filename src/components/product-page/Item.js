/*eslint-disable */
import React from "react";
// JavaScript library for creating Dropdown Selects
// reactstrap components
import {
  Button,
  Input,
  InputGroup,
  Container,
  Row,
  Col,
  Carousel,
  CarouselItem,
} from "reactstrap";

const placeholder = { 
  src: "https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg",
  altText: "",
  caption: ""
}

// Core Components
function Item(props) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);
  const [items, setItems] = React.useState(null)

  const [quantity, setQuantity] = React.useState(1);

  const [field, setField] = React.useState(null)

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === field.fieldImages.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? field.fieldImages.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  React.useEffect(() => {
    setField(props.field)
  })

  return (
    <>
      <div className="section section-item">
        <Container>
          <Row>
            <Col lg="6" md="12">
              {field && field.fieldImages && field.fieldImages.length  ? (
                <Carousel
                  activeIndex={activeIndex}
                  next={next}
                  previous={previous}
                  id="productCarousel"
                >
                  {field.fieldImages.map((item, key) => {
                    return (
                      <CarouselItem
                        onExiting={() => setAnimating(true)}
                        onExited={() => setAnimating(false)}
                        key={key}
                      >
                        <img
                          alt="..."
                          className="d-block"
                          src={item}
                        ></img>
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
                    <Button
                      className="btn-icon btn-round"
                      color="success"
                      name="button"
                      size="sm"
                      type="button"
                    >
                      <i className="ni ni-bold-left"></i>
                    </Button>
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
                    <Button
                      className="btn-icon btn-round"
                      color="success"
                      name="button"
                      size="sm"
                      type="button"
                    >
                      <i className="ni ni-bold-right"></i>
                    </Button>
                  </a>
                </Carousel>
              ) : (
                <>
                  <img src={placeholder.src} className="img-fluid" alt="..." />
                </>
              )}
            </Col>
            <Col className="mx-auto" lg="6" md="12">
              <h2 className="title">{field ? field.field : ""}</h2>
              {/* <div className="stats">
                <div className="stars text-warning">
                  <p className="d-inline">(76 customer reviews)</p>
                </div>
              </div> */}
              <br></br>
              <h6 className="category">Descripción</h6>
              <p className="description">{field ? field.fullDescription : ""}</p>
              <br></br>
              {/* <Row className="justify-content-start">
                <Button
                  onClick={handleBooking}
                  className="ml-3"
                  color="warning"
                >
                  Reservar <i className="ni ni-book"></i>
                </Button>
              </Row> */}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Item;
