import React from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { history } from './modules/helpers'
import Mail from './pages/mail'
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Mail} />
      </Switch>
    </div>
  );
}
const mapStoreToProps = state => ({
})
const mapDispatchToProps = {
}
export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(App));
