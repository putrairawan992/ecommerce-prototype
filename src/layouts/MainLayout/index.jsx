import React, { useState, useEffect } from "react";
import Header from "containers/Header";
import Footer from "../../containers/Footer";
import { useRootContext } from "../../hoc/RootContext";

function MainLayout(props) {
  const { history } = useRootContext();
  const location = history.location.pathname;

  return (
    <React.Fragment>
      {location === "/" ? (
        <div
          style={{
            position: "sticky",
            width: "100%",
            zIndex: 10,
            top: 0
          }}
        >
          <Header match={props} />
        </div>
      ) : (
        <Header match={props} />
      )}
      <div className="container">{props.children}</div>
      <Footer />
    </React.Fragment>
  );
}

export default MainLayout;
