import React from "react";

import Layout from "../components/layout";
import Header from "../components/header";

const InternalServerErrorPage = ({ data, location }) => {
  return (
    <Layout>
      <Header title="500: Palvelinvirhe" />
      <h1>500: Palvelinvirhe</h1>
      <p>Jotain meni pahasti pieleen... Pistä Kepelle viestiä.</p>
    </Layout>
  );
};

export default InternalServerErrorPage;

