import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import {  ExcelRenderer } from "react-excel-renderer";

import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import {
  
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Alert,
} from "reactstrap";
import PageTitle from "../components/PageTitle/PageTitle";
import UserCard from "../components/UserCard/UserCard";

import MySpinner from "../components/MySpinner";

import { loadStudents } from "../store/actions/students";
import { setPageToLoad } from "../store/actions/header";

const UploadData = ({
  students: { isLoading, students, hasMoreItems, error },
  loadStudents,
  header,
  setPageToLoad,
}) => {
  // did mount
  // const [dataLoaded, setDataLoaded] = useState(false);
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [UserModelView, UserModelToggle] = useState(false);
  const [excelUploadData, setExcelUploadData] = useState(null);

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
  
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const fileHandler = (event) => {
    let fileObj = event.target.files[0];
    //let note = { status: false, message: "Upload Failed" };
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
                const ct = c ? c.trim() : `Col ${j + 1}`;
                const newgridCol = {
                  headerName: ct,
                  field: ct.replace(/[^A-Z0-9]+/gi, "_"),
                  sort: true,
                  filter: true,
                  format: "String",
                };
                gridCols.push(JSON.parse(JSON.stringify(newgridCol)));
              });
            } else if (i > 0 && entry && entry.length > 0) {
              const newItems = {};
              entry.forEach((c, j) => {
                const ct = resp.rows[0][j]
                  ? resp.rows[0][j].trim()
                  : `Col ${j + 1}`;
                const cd = c ? c.trim() : ``;
                const field = ct.replace(/[^A-Z0-9]+/gi, "_");
                newItems[field] = cd;
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
      <PageTitle
        title="Upload Data"
        desc="Steps are pretty Simple, Data transfer is just a few clicks"
        fluid="false"
      />

      <section className="py-8 py-md-11">
        <Container>
          <Row className="justify-content-center">
            <Col className="col-md-10 col-lg-8 text-center">
              <h6 className="text-uppercase text-gray-500 font-weight-bold mb-3">
                Seamless integration
              </h6>
            </Col>
          </Row>
          <Row className="no-gutters mb-7 mb-md-9">
            <Col className="col-12 col-md-4 text-center">
              <Row className="mb-5">
                <Col>
                  <div className="icon text-primary mb-3"></div>
                </Col>
                <Col>
                  <hr className="d-none d-md-block" />
                </Col>
              </Row>
              <h3 className="font-weight-bold">Upload your data</h3>
              <p className="text-muted mb-6 mb-md-0 pb-3">
                We support bulk uploading via SQL, integrations with most data
                storage products, or you can use our API.
              </p>
              <Button onClick={toggle} className="mr-2 btn-xs">
                Upload
              </Button>
            </Col>
            <Col className="col-12 col-md-4 text-center">
              <Row className="mb-5">
                <Col>
                  <hr className="d-none d-md-block" />
                </Col>
                <Col>
                  <div className="icon text-primary mb-3"></div>
                </Col>
                <Col>
                  <hr className="d-none d-md-block" />
                </Col>
              </Row>
              <h3 className="font-weight-bold">Sample Data</h3>
              <p className="text-muted mb-6 mb-md-0 pb-3">
                We support bulk uploading via SQL, integrations with most data
                storage products, or you can use our API.
              </p>
              <Button onClick={toggle} className="mr-2 btn-xs">
                Download
              </Button>
              <Button onClick={toggle} className=" btn-xs">
                Use Data
              </Button>
            </Col>
            <Col className="col-12 col-md-4 text-center">
              <Row className="mb-5">
                <Col>
                  <hr className="d-none d-md-block" />
                </Col>
                <Col>
                  <div className="icon text-primary mb-3"></div>
                </Col>
              </Row>
              <h3 className="font-weight-bold">Sample Dashboard</h3>
              <p className="text-muted mb-6 mb-md-0 pb-3">
                We support bulk uploading via SQL, integrations with most data
                storage products, or you can use our API.
              </p>

              <NavLink
                href={`/examples`}
                className={`btn btn-secondary btn-xs d-inline-block`}
              >
                Examples <i class="fe fe-arrow-right ml-3"></i>
              </NavLink>
            </Col>
          </Row>
        </Container>
      </section>

      <Container fluid>
        <Row className="mb-1">
          {students &&
            students.map((user, i) => (
              <UserCard
                user={user.data}
                key={i}
                openUserView={() => openUserView(user)}
              />
            ))}
        </Row>
        <Row>
          <Col>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={` ${activeTab === "1" ? "active" : " "}`}
                  onClick={() => {
                    toggleTab("1");
                  }}
                >
                  Grid Data
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={` ${activeTab === "2" ? "active" : " "}`}
                  onClick={() => {
                    toggleTab("2");
                  }}
                >
                  Column Configuration
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    {(excelUploadData === null ||
                      excelUploadData === "null" ||
                      (excelUploadData.rows &&
                        excelUploadData.rows.length === 0)) && (
                      <Alert color="warning">No Data Available!</Alert>
                    )}

                    {excelUploadData &&
                      excelUploadData.rows &&
                      excelUploadData.rows.length > 0 && (
                        <div
                          id="myGrid"
                          style={{
                            height: "500px",
                            width: "100%",
                          }}
                          className="ag-theme-alpine"
                        >
                          <AgGridReact
                            defaultColDef={{
                              width: 150,
                              editable: true,
                              filter: "agTextColumnFilter",
                              floatingFilter: true,
                              resizable: true,
                            }}
                            defaultColGroupDef={{ marryChildren: true }}
                            columnTypes={{
                              numberColumn: {
                                width: 130,
                                filter: "agNumberColumnFilter",
                              },
                              medalColumn: {
                                width: 100,
                                columnGroupShow: "open",
                                filter: false,
                              },
                              nonEditableColumn: { editable: false },
                              dateColumn: {
                                filter: "agDateColumnFilter",
                                filterParams: {
                                  comparator: function (
                                    filterLocalDateAtMidnight,
                                    cellValue
                                  ) {
                                    var dateParts = cellValue.split("/");
                                    var day = Number(dateParts[0]);
                                    var month = Number(dateParts[1]) - 1;
                                    var year = Number(dateParts[2]);
                                    var cellDate = new Date(year, month, day);
                                    if (cellDate < filterLocalDateAtMidnight) {
                                      return -1;
                                    } else if (
                                      cellDate > filterLocalDateAtMidnight
                                    ) {
                                      return 1;
                                    } else {
                                      return 0;
                                    }
                                  },
                                },
                              },
                            }}
                            rowData={excelUploadData.rows}
                            onGridReady={onGridReady}
                          >
                            {excelUploadData.cols &&
                              excelUploadData.cols.length > 0 &&
                              excelUploadData.cols.map((col, i) => (
                                <AgGridColumn
                                  headerName={col.headerName}
                                  field={col.field}
                                  key={`col_${col.i}_${col.field}`}
                                  sort={col.sort}
                                  filter={col.filter}
                                ></AgGridColumn>
                              ))}

                            <AgGridColumn
                              headerName="Date"
                              field="date"
                              type={["dateColumn", "nonEditableColumn"]}
                              width={220}
                            ></AgGridColumn>
                          </AgGridReact>
                        </div>
                      )}
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table table-sm">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">First</th>
                          <th scope="col">Last</th>
                          <th scope="col">Handle</th>
                        </tr>
                      </thead>
                      <tbody>
                        {excelUploadData &&
                          excelUploadData.cols &&
                          excelUploadData.cols.length > 0 &&
                          excelUploadData.cols.map((col, i) => (
                            <tr>
                              <th scope="row"> {i}</th>
                              <td>{col.headerName}</td>
                              <td>{col.field}</td>
                              <td>{col.format}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
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
)(UploadData);
