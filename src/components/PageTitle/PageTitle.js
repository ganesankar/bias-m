import React from "react";
import {  Container, Row , Col} from "reactstrap";
const PageTitle = ({ title, desc, fluid }) => {
  return (
    <div className="bg-light pt-5">
     <Container>
          <Row className="row justify-content-center py-3">
            <Col className="col-12 col-md-10 col-lg-8 text-center">
              <h2 className="font-weight-bold">{title}</h2>
              <p className="font-size-lg text-muted mb-7 mb-md-9">{desc}</p>
            </Col>
          </Row>
        </Container>
    </div>
  );
};

export default PageTitle;
