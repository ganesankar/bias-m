import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";

import { setPageToLoad } from "../../store/actions/header";
import {
  getGoogleUser,
  logOutGoogleUser,
  getLocalUser,
  logoutLocalUser,
} from "../../store/actions/auth";
import { config } from "../../services/config";
const Header = ({
  nav,
  location,
  identity,
  name,
  avatar_url,
  setPageToLoad,
  liked,
  cart,
  auth,
  setDialog,
}) => {
  const { pathname } = location;
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    getGoogleUser();
    getLocalUser();
  }, []);

  function getCurrentUser() {
    let user = null;
    user = auth.googleUser ? "google" : auth.localUser ? "local" : null;
    return user;
  }

  const { navMenu } = nav;
  return (
    <Navbar className="navbar navbar-expand-lg navbar-light bg-white">
      <Container fluid>
        <NavbarBrand href="/">
          <div className="d-flex justify-content-between ">
            <div className="logo">
              {" "}
              <div className="d-flex justify-content-between ">
                <div className="">&bull;</div>
                <div className="">&bull;</div>
                <div className="">&bull;</div>
              </div>
              <div className="d-flex justify-content-between ">
                <div className="">&bull;</div>
                <div className="">&bull;</div>
                <div className="">&bull;</div>
              </div>
              <div className="d-flex justify-content-between ">
                <div className="">&bull;</div>
                <div className="">&bull;</div>
                <div className="">&bull;</div>
              </div>
            </div>
            <div className="pl-2">Bias-M</div>
          </div>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="navbar-nav ml-auto" navbar>
            {navMenu.map((menu, i) => (
              <NavItem>
                <NavLink href={menu.link} className={`${menu.class}`}>
                  {menu.title}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};
export default connect(
  (state) => ({
    header: state.headerReducer,
    liked: state.likedReducer,
    cart: state.cartReducer,
    auth: state.authReducer,
  }),
  {
    setPageToLoad,
    getGoogleUser,
    logOutGoogleUser,
    getLocalUser,
    logoutLocalUser,
  }
)(withRouter(Header));
