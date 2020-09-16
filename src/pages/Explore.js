import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";
import PageTitle from "../components/PageTitle/PageTitle";

import MySpinner from "../components/MySpinner";

import { loadStudents } from "../store/actions/students";
import { setPageToLoad } from "../store/actions/header";

import { exploreList } from "./../constants/explore";
const Explore = ({
  students: { isLoading, error },
  loadStudents,
  header,
  setPageToLoad,
}) => {
  // did mount
  // const [dataLoaded, setDataLoaded] = useState(false);
  //const [modal, setModal] = useState(false);
  const [excelUploadData, setExcelUploadData] = useState(null);

  useEffect(() => {
    //loadStudents();
    let retrievedStrData = localStorage.getItem("biaSDataSample");
    if (retrievedStrData) {
      let retrievedObject = JSON.parse(retrievedStrData);
      if (retrievedObject && retrievedObject.rows) {
        setExcelUploadData({
          cols: retrievedObject.cols,
          rows: retrievedObject.rows,
        });
        //console.log(retrievedStrData);
      }
    }
  }, []);

  //console.log(excelUploadData);
  if (error) return <Redirect to={"/error"} />;
  if (isLoading) return <MySpinner key={0} text={"Loading..."} />;
  console.log("excelUploadData", excelUploadData);

  return (
    <Fragment>
      <PageTitle
        title="Explore "
        desc="Favorite Intelligence with easier Analytics of your data"
        fluid="false"
      />
      <div className="section bg-black pt-9  pb-8 pb-md-11">
        <Container>
          <Row className="justify-content-between align-items-center mb-5">
            <Col>
              <h2 className="text-white">
                We start with your needs and deliver a full analytics solution.
              </h2>

              <div className="lead text-muted-80 mb-0">
                Once you update the data, we handle the differnet view.
              </div>
            </Col>
          </Row>
          <Row>
            {exploreList &&
              exploreList.features.map((f, j) => (
                <Col className="col-12 col-md-4">
                  <Row>
                    <Col className="col-auto col-md-12">
                      <Row className="no-gutters align-items-center mb-md-5">
                        <Col className="col-auto">
                          <a
                            className="btn btn-sm btn-rounded-circle btn-gray-400-10 disabled opacity-1"
                            href="#!"
                          >
                            <span>{j + 1}</span>
                          </a>
                        </Col>
                        <Col>
                          <hr className="d-none d-md-block border-gray-900-50 mr-n7" />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-md-12 ml-n5 ml-md-0">
                      <h3 className="text-white">{f.title}</h3>
                      <p className="text-muted-80 mb-6 mb-md-0">{f.desc}</p>
                    </Col>
                  </Row>
                </Col>
              ))}
          </Row>
        </Container>
      </div>
      <div className="section pt-md-8 pb-8 pb-md-4">
        <div className="container">
          <Row className="justify-content-between align-items-center mb-5">
            <Col>
              <h2 className="text">Types of Reports and views</h2>

              <div className="lead text-muted-80 mb-0">
                We mostly use D3 Charts and few other open source sharts,
                listing out all available charts
              </div>
            </Col>
          </Row>
          <Row>
            {exploreList &&
              exploreList.charts.map((f, j) => (
                <Col className="col-12 col-md-6 col-lg-4 mb-5">
                  <Card className="card-border border-dark shadow-lg mb-6 mb-md-8 mb-lg-0 lift lift-lg">
                    <CardBody className="text-center">
                      <div className="icon-circle bg-dark text-white mb-5">
                        <i className="fe fe-users"></i>
                      </div>
                      <CardTitle> {f.title}</CardTitle>
                      <CardText></CardText>
                    </CardBody>
                  </Card>
                </Col>
              ))}
          </Row>
        </div>
      </div>
    </Fragment>
  );
};

export default connect(
  (state) => ({
    students: state.studentsReducer,
    header: state.headerReducer,
  }),
  { loadStudents, setPageToLoad }
)(Explore);
