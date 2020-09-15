import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { getImgPlaceHolder, get50Char } from './../../utils';

const ArticleCard = ({ data, id, ts }) => {
  const { basic, created, modified, pic } = data;
  let title = '';
  let desc = '';
  let pici = '';
  if (basic && basic.length > 0) {
    title = basic.find((x) => x.field === 'title').val || '';
    desc = basic.find((x) => x.field === 'desC').val || '';
    pici = getImgPlaceHolder(title);
  }
  if (pic && pic.length > 0) {
    pici = pic[0].base64;
  }
  return (
    <>
      <LinkContainer to={`article/${id}`}>
        <Nav.Link>
          <div
            className="d-block d-md-flex podcast-entry bg-white mb-5"
            data-aos="fade-up"
          >
            <div className="text">
              <h3 className="font-weight-light"> {title}</h3>
              <div className=" mb-3 text-black">
                <span className="text-black-opacity-05">
                  <small>
                    By {} <span className="sep">/</span>{' '}
                    {moment(created / 10000).format('MM ddd, YYYY')}
                  </small>
                </span>
              </div>
              <div className="mb-4 text-black">{desc && get50Char(desc)}</div>
            </div>
          </div>
        </Nav.Link>
      </LinkContainer>
    </>
  );
};

export default connect((state) => ({}), {})(ArticleCard);
