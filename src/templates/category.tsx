import React from "react";
import { Link, graphql } from "gatsby";
import parse from "html-react-parser";

import Layout from "../components/layout";
import Header from "../components/header";

import PostsList from "../components/posts-list";

const Category = (props) => {
  const { data, pageContext } = props;
  const { category } = pageContext;

  const posts = data.allWpPost.edges.map(node => node.node);

  return (
    <Layout isHomePage={true}>
      <Header title={category} />
      <h1>{category}</h1>
      <PostsList posts={posts} highlighted={false} />
    </Layout >
  );
};

export default Category;

export const pageQuery = graphql`
  query($category: String!) {
    allWpPost(
      filter: { categories: { nodes: { elemMatch: { name: { eq: $category } } } } }
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
