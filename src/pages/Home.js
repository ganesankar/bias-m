import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { Card, CardText, CardBody, Row, Col, NavLink } from "reactstrap";

import MySpinner from "./../components/MySpinner";

import { loadArticles } from "./../store/actions/articles";
import { setPageToLoad } from "./../store/actions/header";

import { menuAll } from "./../constants/Menu";
const Home = ({
  articles: { isLoading, articles, error },
  loadArticles,
  header,
  setPageToLoad,
}) => {
  // did mount
  useEffect(() => {
    loadArticles();
  }, []);



  console.log(articles);
  if (error) return <Redirect to={"/error"} />;
  if (isLoading) return <MySpinner key={0} text={"Loading..."} />;
  console.log("articles", articles);


  return (
    <Fragment>
      <section className="pt-4 pt-md-11">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-md-5 col-lg-6 order-md-2"></div>
            <div className="col-12 col-md-7 col-lg-6 order-md-1">
              <h1 className="display-3 text-center text-md-left">
                <span className="text-primary">Bias-M</span> <br />
                Analyse anything.
              </h1>

              <p className="lead text-center text-md-left text-muted mb-6 mb-lg-8">
                Business Intelligence, Analytics, Statistics &amp; Management
              </p>

              <div className="text-center text-md-left">
                <NavLink
                  href="/explore"
                  className="btn btn-primary shadow lift mr-1 d-inline-block"
                >
                  Explore
                </NavLink>
                <NavLink
                  href="/explore"
                  className="btn btn-primary-soft lift d-inline-block"
                >
                  Getting Started
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 py-md-11 border-bottom">
        <div className="container">
          <div className="row">
            <div
              className="col-12 col-md-4 aos-init aos-animate"
              data-aos="fade-up"
            >
              <div className="icon text-primary mb-3"></div>

              <h3>Built for developers</h3>

              <p className="text-muted mb-6 mb-md-0">
                Bias-M is built to make its configuring easier with reusable
                components. Open to modify to any stack and
              </p>
            </div>
            <div
              className="col-12 col-md-4 aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay="50"
            >
              <div className="icon text-primary mb-3"></div>

              <h3>Designed to be modern</h3>

              <p className="text-muted mb-6 mb-md-0">
                Bias-M feels modern, minimal, beautiful yet powerful for user
                driven format
              </p>
            </div>
            <div
              className="col-12 col-md-4 aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="icon text-primary mb-3"></div>

              <h3>Open Source</h3>

              <p className="text-muted mb-0">
                Meet the easy, open source way for everyone in your company to
                ask questions and learn from data.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="section py-8 py-md-11 bg-gray-200">
        <div className="container">
          <div className="row">
            <div className="site-section-heading text-center mb-5 w-border col-md-6 mx-auto">
              <h6>VISUALIZATION</h6>
              <h2 className="mb-5">
                {" "}
                Visualization-agnostic components to build custom UI
              </h2>
              <p>
                Data fetch and access utilities as client libraries instead of
                pre-built data visualizations. Bindings using Reactjs Support
                any native visualization library such as Chart.js, D3.js,
                Highcharts and others.
              </p>
            </div>
          </div>

          <Row>
            {menuAll.homeMenu.map((menu, i) => (
              <Col sm="12" md="6" lg="3" className="mb-7">
                <Card className="card shadow-light-lg mb-6 mb-md-0 lift lift-lg">
                  <CardBody>
                    <CardText className="text-muted">{menu.desc}</CardText>
                    <NavLink
                      href={menu.link}
                      className={`font-size-sm font-weight-bold text-decoration-none`}
                    >
                      {menu.title}
                    </NavLink>
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
    articles: state.articlesReducer,
    header: state.headerReducer,
  }),
  { loadArticles, setPageToLoad }
)(Home);
