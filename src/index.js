import React, { useEffect, useState, Fragment } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { menuAll } from "./constants/Menu";
import { compose, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import MySpinner from "./components/MySpinner";
import Header from "./components/Header";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home";
import UploadData from "./pages/UploadData";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import Page from "./pages/Page";
import NewsEvents from "./pages/NewsEvents";
import StaticPage from "./pages/StaticPage";
import Example from "./pages/Example";

import Article from "./pages/Article";

import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import MyToast from "./components/MyToast";
import PrivateRoute from "./components/PrivateRoute";
import ScrollToTop from "./components/Common/ScrollToTop";
import rootReducer from "./store/reducers";

import { config } from "./services/config";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./index.css";
import "./app.css";

const Root = () => {
  //
  const initialState = {};
  const [appConfig, setApConfig] = useState(null);
  const [appConLoad, setApConLoad] = useState(false);
  let url = "https://revit08.netlify.app/" || "http://localhost:3002/"; // should look something like "https://foo.netlify.com"
  const currentURL = String(window.location.href);
  if (currentURL.includes("localhost")) {
    //url = 'http://localhost:3002/';
  }
  const erroMsg = `${url} is blank or invalid or not assigned in env variables `;
  if (!url) throw new Error(erroMsg);
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
        compose
    )
  );

  useEffect(() => {
    /*const url = `${config.baseURL}/config-read-all`;
    fetch(url)
      .then((results) => results.json())
      .then((data) => {
        const appConfigData = [];
        data.forEach(function (d, j) {
          appConfigData.push(d.data);
        });
        console.log('appConfigData', appConfigData);
        setApConfig(appConfigData);
        setApConLoad(true);
      })
      .catch((error) => {
        console.error('Error:', error);
        setApConLoad(true);
      });*/
    setApConLoad(true);
  }, []);
  return (
    <Router>
      <Provider store={store}>
        <ScrollToTop />
        {!appConLoad && <MySpinner key={0} text={"Loading..."} />}
        <AuthStatusView appConfig={appConfig} />
        <div className="pageContainer">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/upload" exact component={UploadData} />
            <Route path="/explore" exact component={Explore} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/dashboard/:type/:id" exact component={Dashboard} />

            <Route path="/examples" exact component={Example} />
            <Route path="/docs/:id" exact component={StaticPage} />
            <Route path="/page/:id" exact component={Page} />
            <Route path="/news-events" exact component={NewsEvents} />
            <Route path="/article/:id" exact component={Article} />

            <Route path="/login" component={Login} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="/error" component={Error} />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Redirect to="/error" />
          </Switch>
        </div>
        <Footer nav={menuAll} appConfig={appConfig} />
        <MyToast />
      </Provider>
    </Router>
  );
};

function AuthStatusView(appConfig) {
  const identity = {};
  const [dialog, setDialog] = React.useState(false);
  const name =
    (identity &&
      identity.user &&
      identity.user.user_metadata &&
      identity.user.user_metadata.full_name) ||
    "NoName";
  const avatar_url =
    identity &&
    identity.user &&
    identity.user.user_metadata &&
    identity.user.user_metadata.avatar_url;
  return (
    <div className="App">
      <Header
        nav={menuAll}
        identity={identity}
        avatar_url={avatar_url}
        name={name}
        setDialog={setDialog}
        appConfig={appConfig}
      />
    </div>
  );
}
ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
