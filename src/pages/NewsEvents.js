import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Container from 'react-bootstrap/Container';
import PageTitle from '../components/PageTitle/PageTitle';
import ArticleCard from '../components/Content/ArticleCard';
import MySpinner from '../components/MySpinner';

import { loadArticles } from '../store/actions/articles';
import { setPageToLoad } from '../store/actions/header';

const NewsEvents = ({
  articles: { isLoading, articles, hasMoreItems, error },
  loadArticles,
  header,
  setPageToLoad,
}) => {
  // did mount
  useEffect(() => {
    loadArticles();
  }, []);

  function getId(todo) {
    if (!todo.ref) {
      return null;
    }
    return todo.ref['@ref'].id;
  }

  // console.log(articles);
  if (error) return <Redirect to={'/error'} />;
  if (isLoading) return <MySpinner key={0} text={'Loading...'} />;
  // console.log('articles', articles);
  return (
    <Fragment>
      <PageTitle title="News & Events" desc="articles" />
      <Container className="margin-top">
        <Row className="mb-3">
          {articles &&
            articles.map((data, i) => (
              <div className="col-md-6 ">
                <ArticleCard
                  data={data.data}
                  ts={data.ts}
                  id={getId(data)}
                  key={getId(data)}
                />
              </div>
            ))}
        </Row>
      </Container>
      {error && (
        <Row className="mb-3">
          <Col>
            <h4 className="text-center">No articles</h4>
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

export default connect(
  (state) => ({
    articles: state.articlesReducer,
    header: state.headerReducer,
  }),
  { loadArticles, setPageToLoad },
)(NewsEvents);
