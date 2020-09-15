import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import PageTitle from '../components/PageTitle/PageTitle';
import UserCard from '../components/UserCard/UserCard';
import UserDetail from '../components/UserCard/UserDetail';

import MySpinner from '../components/MySpinner';

import { loadStudents } from '../store/actions/students';
import { setPageToLoad } from '../store/actions/header';

const UploadData = ({
  students: { isLoading, students, hasMoreItems, error },
  loadStudents,
  header,
  setPageToLoad,
}) => {
  // did mount
  const [UserModelView, UserModelToggle] = useState(false);
  const [userViewData, setUserViewData] = useState(null);
  const userViewBackData = JSON.parse(JSON.stringify(userViewData));
  const identity = {};
  const userLogged =
    (identity && identity.user && identity.user.email) || 'NoName';
  useEffect(() => {
    loadStudents();
  }, []);
  const openUserView = (user) => {
    console.log('g', user);
    setUserViewData(user);
    UserModelToggle(true);
  };
  const updateUserView = (data) => {
    userViewData.data = data;
    setUserViewData(userViewData);
  };

  const onInputChange = (group, field, value) => {
    console.log(`${group} ${field} ${value}`);
    var ind = userViewData.data[group].findIndex((x) => x.field === field);
    if (ind >= 0) {
      userViewData.data[group][ind].val = value;
    }
    setUserViewData({});
    setTimeout(function () {
      setUserViewData(userViewData);
    });
  };
  const cancelEdit = () => {
    console.log('userViewData', userViewBackData);
    setUserViewData({});
    setTimeout(function () {
      setUserViewData(userViewBackData);
    });
  };
  //console.log(Students);
  if (error) return <Redirect to={'/error'} />;
  if (isLoading) return <MySpinner key={0} text={'Loading...'} />;
  // console.log('Students', students);
  console.log('userLogged', userLogged);

  return (
    <Fragment>
      <PageTitle title="STUDENTS" desc="STUDENTS" />

      <Container className="pt-4">
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
      </Container>

      <Modal
        size="lg"
        show={UserModelView}
        onHide={() => UserModelToggle(false)}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <UserDetail
            user={userViewData}
            type="student"
            userLogged={userLogged}
            onInputChange={onInputChange}
            cancelEdit={cancelEdit}
          />
        </Modal.Body>
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
  { loadStudents, setPageToLoad },
)(UploadData);
