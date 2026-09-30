import React from "react";
import ReactDOM from "react-dom/client";
import { KageLandingPage } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";
import "./styles.css";

function Scene() {
  return (
    <div className="shader-frame">
      <KageLandingPage
        headingFont="onest"
        bodyFont="onest"
        headingWeight="400"
        bodyWeight="300"
        primaryColor="#e0231c"
        headingSize={46}
        bodySize={17}
        headingLetterSpacing={-0.012}
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Scene />
  </React.StrictMode>
);
