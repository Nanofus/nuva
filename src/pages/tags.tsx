import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import Header from "../components/header";

const TagsPage = ({ data, location }) => {
  return (
    <Layout>
      <Header title="Tagit" />
      <h1>Tagit</h1>
      <div className="tagContainer">
        {data.allWpTag.nodes.map((node, i) => {
          return <div className="tag" key={i}>{node.name} </div>;
        })}
      </div>
    </Layout>
  );
};

export const TagsPageQuery = graphql`
  query TagsPageQuery {
    allWpTag(sort: { fields: [name], order: ASC }) {
      nodes {
        name
        id
      }
    }
  }
`;

export default TagsPage;
