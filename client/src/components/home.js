import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
import BootstrapCarousel from "./carousel";
import ProductList from "./productList";

function Home() {
  return (
    <div className="container">
      <h1>Home page</h1>
      <BootstrapCarousel />
      <ProductList />
    </div>
  );
}

export default Home;