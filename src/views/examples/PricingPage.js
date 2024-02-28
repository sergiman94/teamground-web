/*eslint-disable */
import React from "react";

// reactstrap components
// import {
//
// } from "reactstrap";

// Core Components
import DemoFooter from "components/footers/DemoFooter.js";
import Pricing3 from "components/pricings/Pricing3.js";

function PricingPage() {
  React.useEffect(() => {
    document.body.classList.add("confirm");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("confirm");
    };
  });
  return (
    <>
      <div className="wrapper">
        <div className="main mt-5">
          <Pricing3 />
        </div>
        <DemoFooter />
      </div>
    </>
  );
}

export default PricingPage;
