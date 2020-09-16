import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Navbar,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

import { WidthProvider, Responsive } from "react-grid-layout";
import MySpinner from "../components/MySpinner";

import { loadStudents } from "../store/actions/students";
import { setPageToLoad } from "../store/actions/header";

// import { sampleDash } from "./../constants/sampleDashboard";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard = ({
  students: { isLoading, students, hasMoreItems, error },
  loadStudents,
  header,
  setPageToLoad,
}) => {
  // did mount
  // const [dataLoaded, setDataLoaded] = useState(false);
  //const [setDataLoaded] = useState(false);
  const [modal, setModal] = useState(false);
  const [excelUploadData, setExcelUploadData] = useState(null);
  const layout = [
    { i: "a", x: 0, y: 0, w: 6, h: 1 },
    { i: "b", x: 4, y: 0, w: 4, h: 1 },
    { i: "c", x: 8, y: 5, w: 4, h: 1 },
    { i: "d", x: 0, y: 1, w: 4, h: 1 },
    { i: "e", x: 4, y: 1, w: 4, h: 1 },
    { i: "f", x: 8, y: 1, w: 4, h: 1 },
  ];
  const toggle = () => setModal(!modal);
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

  const onLayoutChange = (layout) => {
    console.log(layout);
  };

  //console.log(excelUploadData);
  if (error) return <Redirect to={"/error"} />;
  if (isLoading) return <MySpinner key={0} text={"Loading..."} />;
  console.log("excelUploadData", excelUploadData);

  return (
    <Fragment>
      <Navbar className=" navbar-dark bg-dark navbar-expand-lg text-white ">
        <Container fluid>
          <span class="navbar-brand">Dashboard</span>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
      <Container fluid className="bg-gray-300 py-3">
        <ResponsiveGridLayout
          className="layout"
          layouts={layout}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={200}
          onLayoutChange={onLayoutChange}
        >
          {layout &&
            layout.map((f, j) => (
              <Card className="shadow-light-lg mb-6 mb-md-0 " key={f.i}>
                <CardBody className="position-relative">
                  <h3> {f.title}</h3>
                  <p class="text-muted">{f.desc}</p>
                </CardBody>
              </Card>
            ))}
        </ResponsiveGridLayout>
      </Container>
      <Modal isOpen={modal} toggle={toggle} className={""}>
        <ModalHeader toggle={toggle}> Upload Excel</ModalHeader>
        <ModalBody>test</ModalBody>
      </Modal>

      {!error && !hasMoreItems && (
        <Row className="mb-2">
          <Col>
            <h4 className="text-center">No Students</h4>
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

export default connect(
  (state) => ({
    students: state.studentsReducer,
    header: state.headerReducer,
  }),
  { loadStudents, setPageToLoad }
)(Dashboard);
