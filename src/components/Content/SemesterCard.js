import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { getImgPlaceHolder, get50Char, domTagByField } from './../../utils';

const ArticleCard = ({ data, ind }) => {
  const { basic, subjects, modified, pic } = data;
  console.log(basic);
  const boxIcon = ind % 2 === 0 ? '' : 'bg-dark';
  return (
    <>
      <div className={`site-section ${boxIcon}`}>
        <div className="container">
          <div className="row">
            <div
              className="site-section-heading text-center mb-5 w-border col-md-6 mx-auto "
              data-aos="fade-up"
            >
              <h2 className="mb-5">{basic.sName}</h2>
              {basic &&
                basic.map((i, j) => (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: domTagByField(i),
                    }}
                  />
                ))}
            </div>
          </div>
          <div className="row">
            {subjects &&
              subjects.map((i, j) => (
                <div key={`basicSub${j}`} className="col-md-6 col-lg-4 mb-4 ">
                  <div className="p-4 bg-white">
                    <h2 className="h5 text-black mb-3">{i.basic_sName}</h2>
                    <span className="d-block text-secondary small text-uppercase">
                      {i.basic_sTaff}
                    </span>
                  </div>{' '}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default connect((state) => ({}), {})(ArticleCard);
