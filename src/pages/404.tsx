import React from "react";

import Layout from "../components/layout";
import Header from "../components/header";

const NotFoundPage = ({ data, location }) => {
  return (
    <Layout>
      <Header title="404: Ei löydy" />
      <h1>404: Ei löydy</h1>
      <p>Yritit lukea olematonta ropeosaa! Ehkä sinun pitäisi kirjoittaa se?</p>
    </Layout>
  );
};

export default NotFoundPage;
