import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";

import MySpinner from "../components/MySpinner";

import {
  Card,
  CardBody,
  Col,
  NavLink,
} from "reactstrap";

import { loadPage } from "../store/actions/pageDetails";
import { showToast, hideToast } from "../store/actions/toast";

import { sampleDash } from "./../constants/sampleDashboard";
const Example = ({
  pageDetails,
  match,
}) => {
  const { page, isLoading, error } = pageDetails;

  useEffect(() => {
    console.log("component updated", match.params.id);
    // loadPage(match.params.id);
  }, [match.params.id]);

  if (error) return <Redirect to={"/error"} />;
  if (isLoading) return <MySpinner key={0} text={"Loading..."} />;

  const data = pageDetails.page ? pageDetails.page.data : {};
  return (
    <Fragment>
      <section class="pt-8 pt-md-11 bg-gradient-light">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-8 text-center">
              <span class="badge badge-pill badge-success-soft mb-3">
                <span class="h6 text-uppercase">EXAMPLES</span>
              </span>

              <h1>See Dashboard in action</h1>

              <p class="font-size-lg text-gray-700 mb-7 mb-md-9">
              Explore our gallery of sample data reports and dashboards. See something you like? To get started, simply make a copy and connect your data.
              </p>
            </div>
          </div>
          <div class="row pb-9">
            {sampleDash &&
              sampleDash.boards.map((f, j) => (
                <Col className="col-12 col-md-4">
                  <Card className="shadow-light-lg mb-6 mb-md-0 lift lift-lg">
                    <CardBody className="position-relative">
                      <div class="position-relative text-right mt-n8 mr-n4 mb-3">
                        <span class="badge badge-pill badge-success">
                          <span class="h6 text-uppercase"> count</span>
                        </span>
                      </div>
                      <h3> {f.title}</h3>
                      <p class="text-muted">{f.desc}</p>

                      <NavLink
                        href={`/dashboard/sample/${j+1}`}
                        className={`font-weight-bold text-decoration-none`}
                      >
                        View <i class="fe fe-arrow-right ml-3"></i>
                      </NavLink>
                    </CardBody>
                  </Card>
                </Col>
              ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default connect(
  (state) => ({
    pageDetails: state.pageDetailsReducer,
    cart: state.cartReducer,
    liked: state.likedReducer,
  }),
  {
    loadPage,

    showToast,
    hideToast,
  }
)(withRouter(Example));
