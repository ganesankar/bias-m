import React from "react";
import { connect } from "react-redux";
import { NavLink } from "reactstrap";
const Footer = ({ nav }) => {
  const { footer } = nav;

  return (
    <>
      <footer
        className="py-8 py-md-11 bg-gray-200
      "
      >
        <div className="container border-top py-md-7">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <div className="mb-5">
                <h3 className="footer-heading mb-4 text-primary">Bias-M</h3>
                <p className="text-gray-700 mb-2">
                Build <br />
                  2020 &copy; Ganesan Karuppaiya
                </p>
              </div>
            </div>
            {footer.map((menu, i) => (
              <div className="col-12 col-md-3 col-lg-3">
                <h6 className="font-weight-bold text-uppercase text-gray-700">
                  {menu.title}
                </h6>
                <ul className="list-unstyled text-muted mb-6 mb-md-8 mb-lg-0">
                  {menu.content.map((menui, j) => (
                    <li className="mb-0">
                      <NavLink href={menui.link} className="text-reset">
                        {menui.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div> 
            ))}
          </div>
        </div>
      </footer>
    </>
  );
};

export default connect((state) => ({}), {})(Footer);
