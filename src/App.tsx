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
import { Open } from "./pages/Open";


function App() {
  return (
    <HashRouter hashType="noslash" >
      <Switch>
        <Route path="/new">
          <Editor new />
        </Route>
        <Route path="/:resourceid">
          <Open />
        </Route>
        <Route path="/">
          <HomepageLayout />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
