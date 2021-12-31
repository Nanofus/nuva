import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import Header from "../components/header";

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout>
      {" "}
      {/*location={location} title={siteTitle}*/}
      <Header title="404: Ei löydy" />
      <h1>404: Ei löydy</h1>
      <p>Yritit lukea olematonta ropeosaa! Ehkä sinun pitäisi kirjoittaa se?</p>
    </Layout>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
