import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { OutTable, ExcelRenderer } from "react-excel-renderer";

import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Navbar,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

import { WidthProvider, Responsive } from "react-grid-layout";
import MySpinner from "../components/MySpinner";

import { loadStudents } from "../store/actions/students";
import { setPageToLoad } from "../store/actions/header";

import { sampleDash } from "./../constants/sampleDashboard";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard = ({
  students: { isLoading, students, hasMoreItems, error },
  loadStudents,
  header,
  setPageToLoad,
}) => {
  // did mount
  const [dataLoaded, setDataLoaded] = useState(false);
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [UserModelView, UserModelToggle] = useState(false);
  const [excelUploadData, setExcelUploadData] = useState(null);
  const userViewBackData = JSON.parse(JSON.stringify(excelUploadData));
  const layout = [
    { i: "a", x: 0, y: 0, w: 6, h: 1 },
    { i: "b", x: 4, y: 0, w: 4, h: 1 },
    { i: "c", x: 8, y: 5, w: 4, h: 1 },
    { i: "d", x: 0, y: 1, w: 4, h: 1 },
    { i: "e", x: 4, y: 1, w: 4, h: 1 },
    { i: "f", x: 8, y: 1, w: 4, h: 1 },
  ];
  const toggle = () => setModal(!modal);
  const toggleTab = (x) => setActiveTab(x);
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
  const openUserView = (user) => {
    console.log("g", user);
    setExcelUploadData(user);
    UserModelToggle(true);
  };
  const updateUserView = (data) => {
    excelUploadData.data = data;
    setExcelUploadData(excelUploadData);
  };

  const onInputChange = (group, field, value) => {
    console.log(`${group} ${field} ${value}`);
    var ind = excelUploadData.data[group].findIndex((x) => x.field === field);
    if (ind >= 0) {
      excelUploadData.data[group][ind].val = value;
    }
    setExcelUploadData({});
    setTimeout(function () {
      setExcelUploadData(excelUploadData);
    });
  };
  const cancelEdit = () => {
    console.log("excelUploadData", userViewBackData);
    setExcelUploadData({});
    setTimeout(function () {
      setExcelUploadData(userViewBackData);
    });
  };
  const onLayoutChange = (layout) => {
    console.log(layout);
  };
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };
  const fileHandler = (event) => {
    let fileObj = event.target.files[0];
    let note = { status: false, message: "Upload Failed" };
    const gridCols = [];
    const gridRows = [];
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        if (resp.rows && resp.rows.length > 1) {
          resp.rows.forEach(function (entry, i) {
            console.log(entry);
            if (i === 0 && entry && entry.length > 0) {
              entry.forEach(function (c, j) {
                console.log(c);
                const newgridCol = {
                  headerName: c,
                  field: c.replace(/[^A-Z0-9]+/gi, "_") || `c${j}`,
                  sort: true,
                  filter: true,
                  format: "String",
                };
                gridCols.push(JSON.parse(JSON.stringify(newgridCol)));
              });
            } else if (i > 0 && entry && entry.length > 0) {
              const newItems = {};
              entry.forEach((c, j) => {
                const field =
                  resp.rows[0][j].replace(/[^A-Z0-9]+/gi, "_") || `c${j}`;
                newItems[field] = c;
              });
              gridRows.push(JSON.parse(JSON.stringify(newItems)));
            }
          });
        }
        localStorage.setItem(
          "biaSDataSample",
          JSON.stringify({ cols: gridCols, rows: gridRows })
        );
        setExcelUploadData({ cols: gridCols, rows: gridRows });
        setModal(false);
      }
    });
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
        <ModalBody>
          <input
            type="file"
            onChange={fileHandler.bind(this)}
            style={{ padding: "10px" }}
          />
        </ModalBody>
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
