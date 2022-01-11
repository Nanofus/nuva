import React from "react";
import { Link, graphql } from "gatsby";
import parse from "html-react-parser";

import Layout from "../components/layout";
import Header from "../components/header";

import PostsList from "../components/posts-list";

const Tag = (props) => {
  const { data, pageContext } = props;
  const { tag } = pageContext;

  const posts = data.allWpPost.edges.map(node => node.node);

  return (
    <Layout isHomePage={true}>
      <Header title={tag} />
      <h1>Tagi: {tag}</h1>
      <PostsList posts={posts} highlighted={false} />
    </Layout >
  );
};

export default Tag;

export const pageQuery = graphql`
  query($tag: String!) {
    allWpPost(
      filter: { tags: { nodes: { elemMatch: { name: { eq: $tag } } } } }
      sort: { fields: [date], order: DESC }
    ) {
      edges {
        node {
          additionalFields {
            authorgroup
          }
          title
          date(formatString: "MMMM DD, YYYY", locale: "fi")
          excerpt
          slug
          uri
          author {
            node {
              firstName
            }
          }
          categories {
            nodes {
              name
            }
          }
        }
      }
    }
    allWpPage {
      edges {
        node {
          uri
          title
        }
      }
    }
    allWpCategory {
      nodes {
        name
      }
    }
  }
`;
