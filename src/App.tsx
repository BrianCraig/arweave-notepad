import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { HomepageLayout } from "./pages/Homepage";
import { Editor } from "./pages/Editor";


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/editor">
          <Editor />
        </Route>
        <Route path="/">
          <HomepageLayout />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
