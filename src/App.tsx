import React from "react";
import {
  Switch,
  Route,
  HashRouter
} from "react-router-dom";
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { HomepageLayout } from "./pages/Homepage";
import { Editor } from "./pages/Editor";


function App() {
  return (
    <HashRouter basename={window.location.pathname} hashType="noslash" >
      <Switch>
        <Route path="/new">
          <Editor new />
        </Route>
        <Route path="/:resourceid">
          <Editor />
        </Route>
        <Route path="/">
          <HomepageLayout />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
