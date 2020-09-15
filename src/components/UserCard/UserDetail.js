import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { getImgPlaceHolder } from './../../utils';
const UserDetail = ({ user, type, userLogged, onInputChange, cancelEdit }) => {
  const [editProfileView, editProfileToggle] = useState(false);

  const { data } = user;

  //const backData = JSON.parse(JSON.stringify(data));
  let claimedBy = '';
  let pic = '';
  let name = '';
  if (data) {
    claimedBy = data.claimedBy;
    if (data.basic) {
      name = data.basic.find((x) => x.field === 'fName').val || '';
      pic = getImgPlaceHolder(name);
    }

    if (data.pic && data.pic.length > 0) {
      pic = data.pic[0].base64;
    }
  }

  console.log(`${userLogged} ${claimedBy}`);

  const cancelEditL = () => {
    //data = backdata;
    cancelEdit();
    editProfileToggle(false);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-12 text-center pt-2 pb-2"></div>
        </div>
        <div className="row ">
          <div className="col-md-6 text-center">
            <div className="hero-img wow fadeInUp">
              <div className="img-border m-0">
                <img
                  alt="cmsImage"
                  className="img-center img-fluid  rounded-circle"
                  src={pic}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mh-header-info">
              <ul>
                {data &&
                  data.basic &&
                  data.basic.map((i, j) => (
                    <li key={`basicUser${j}`}>
                      {editProfileView ? (
                        <div className="input-group input-group-sm mb-3">
                          <div className="input-group-prepend">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              <i className={`fa  ${i.ico}`}></i>
                              {i.name}
                            </span>
                          </div>
                          <input
                            type={i.type}
                            class="form-control"
                            value={i.val || ''}
                            name={i.field || ''}
                            onChange={(e) =>
                              onInputChange('basic', i.field, e.target.value)
                            }
                          />
                        </div>
                      ) : (
                        <span>
                          <i className={`fa  ${i.ico}`}></i> {i.name}: {i.val}
                        </span>
                      )}
                    </li>
                  ))}
              </ul>
              <hr />
              <h5> Contact Infomation</h5>
              <ul>
                {data &&
                  data.contact &&
                  data.contact.map((i, j) => (
                    <li key={`contactUser${j}`}>
                      {editProfileView ? (
                        <div className="input-group input-group-sm mb-3">
                          <div className="input-group-prepend">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              <i className={`fa  ${i.ico}`}></i>
                              {i.name}
                            </span>
                          </div>
                          <input
                            type={i.type}
                            class="form-control"
                            value={i.val || ''}
                            name={i.field || ''}
                            onChange={(e) =>
                              onInputChange('contact', i.field, e.target.value)
                            }
                          />
                        </div>
                      ) : (
                        <span>
                          <i className={`fa  ${i.ico}`}></i> {i.name}: {i.val}
                        </span>
                      )}
                    </li>
                  ))}
              </ul>
              <hr />

              {data && data.subjects && (
                <div>
                  <h5> Subjects handled on semester</h5>
                  <ul>
                    {data.subjects.map((i, j) => (
                      <li key={`subjectsUser${j}`}>
                        {i.val && (
                          <span>
                            <span class="badge badge-primary badge-pill">
                              {' '}
                              {j + 1}
                            </span>{' '}
                            {i.val}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                  <hr />
                </div>
              )}
              {data && data.social && (
                <div>
                  <h5> Social Links</h5>
                  <ul className="social-icon wow fadeInUp">
                    {data.social.map((i, x) => (
                      <li key={`socialUser${x}`}>
                        <a
                          className="nav-link "
                          target="_blank"
                          rel="noopener noreferrer"
                          href={i.val}
                        >
                          <i className={`fa  ${i.ico}`}></i>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect((state) => ({}), {})(UserDetail);
