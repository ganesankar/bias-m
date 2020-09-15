import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './styles.css';

const Liked = ({ liked: { likedProducts } }) => {
  // console.log(likedProducts);

  return (
    <Fragment>
      <Row>
        {likedProducts.map((product, i) => (
          <Col />
        ))}
      </Row>

      {likedProducts.length === 0 && (
        <Row className="justify-content-center">
          <h4>There are no liked products yet.</h4>
        </Row>
      )}
    </Fragment>
  );
};

export default connect(
  (state) => ({
    liked: state.likedReducer,
  }),
  {},
)(Liked);
