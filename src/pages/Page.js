import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';

import MySpinner from '../components/MySpinner';
import PageTitle from '../components/PageTitle/PageTitle';
import PageContent from '../components/Content/PageContent';

import { loadPage } from '../store/actions/pageDetails';
import { showToast, hideToast } from '../store/actions/toast';

const Page = ({
  pageDetails,
  loadPage,
  match,
  liked,
  showToast,
  hideToast,
}) => {
  const { page, isLoading, error } = pageDetails;
  let title = '';
  if (page && page.data && page.data.basic && page.data.basic.length > 0) {
    title = page.data.basic.find((x) => x.field === 'title').val || '';
  }
  useEffect(() => {
    console.log('component updated', match.params.id);
    loadPage(match.params.id);
  }, [match.params.id]);

  if (error) return <Redirect to={'/error'} />;
  if (isLoading) return <MySpinner key={0} text={'Loading...'} />;

  const data = pageDetails.page ? pageDetails.page.data : {};
  return (
    page && (
      <Fragment>
        <PageTitle title={title} desc="" />
        <PageContent data={data} />
      </Fragment>
    )
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
  },
)(withRouter(Page));
