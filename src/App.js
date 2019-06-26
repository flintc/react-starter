
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";
import Landing from './Landing'
import { css, keyframes } from "@emotion/core";

const App = () => {
  const theme = useState("darkblue");
  return (
    <div>
      <header css={css`
      background-color: red;
    `}>
        <Link to="/">Adopt Me 2!</Link>
      </header>

      <Router>
        <Landing exact path="/" />
      </Router>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));