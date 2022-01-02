import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";
import Header from "../components/header";

const TagsPage = ({ data, location }) => {
  return (
    <Layout>
      <Header title="Tagit" />
      <h1>Tagit</h1>
      <div className="tagContainer">
        {data.allWpTag.nodes.map((node, i) => {
          return <Link className="tag" key={i} to={"/tag/" + node.slug}>{node.name}</Link>;
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
        slug
        id
      }
    }
  }
`;

export default TagsPage;
