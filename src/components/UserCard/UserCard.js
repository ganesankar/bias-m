import React from 'react';
import { connect } from 'react-redux';

import { getImgPlaceHolder } from './../../utils';
const UserCard = ({ user, openUserView, key }) => {
  let name = '';
  let loc = '';
  let pic = '';

  if (user && user.basic) {
    name = user.basic.find((x) => x.field === 'fName').val || '';
    pic = getImgPlaceHolder(name);
  }
  if (user && user.pic && user.pic.length > 0) {
    pic = user.pic[0].base64;
  }

  return (
    <>
      <div className="col-12 col-sm-6 col-lg-4  mb-5 mb-lg-5">
        <div className="team-member" onClick={openUserView}>
          <div className="text-center">
            <img alt="cmsImage" className="img-center img-fluid" src={pic} />
          </div>
          {user && user.basic && (
            <div className="text">
              <h2 className="mb-2 font-weight-light h4 text-uppercase ">
                {name || ''}
              </h2>
              <span className="">{loc || ''}</span>
              <p className="mb-4"></p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default connect((state) => ({}), {})(UserCard);
