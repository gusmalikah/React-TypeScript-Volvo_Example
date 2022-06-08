import React from "react";
import "../public/css/styles.css";

const HomePage = ({Component, pageProps}:any) => {
  return (
    <React.StrictMode>
      <Component {...pageProps} />
    </React.StrictMode>
  );
}


export default HomePage;