import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';

import MySpinner from '../components/MySpinner';
import PageTitle from '../components/PageTitle/PageTitle';
import PageContent from '../components/Content/PageContent';

import { loadArticle } from '../store/actions/articleDetails';
import { showToast, hideToast } from '../store/actions/toast';

const Article = ({
  articleDetails,
  loadArticle,
  match,
  liked,
  showToast,
  hideToast,
}) => {
  const { article, isLoading, error } = articleDetails;
  let title = '';
  if (
    article &&
    article.data &&
    article.data.basic &&
    article.data.basic.length > 0
  ) {
    title = article.data.basic.find((x) => x.field === 'title').val || '';
  }
  useEffect(() => {
    loadArticle(match.params.id);
  }, []);

  if (error) return <Redirect to={'/error'} />;
  if (isLoading) return <MySpinner key={0} text={'Loading...'} />;

  // console.log(article);
  return (
    article && (
      <Fragment>
        <PageTitle title={title} desc="" />
        <PageContent data={article.data} />
      </Fragment>
    )
  );
};

export default connect(
  (state) => ({
    articleDetails: state.articleDetailsReducer
  }),
  {
    loadArticle,

    showToast,
    hideToast,
  },
)(withRouter(Article));
