import React from "react";
import { Link, graphql } from "gatsby";
import parse from "html-react-parser";

import { Post } from "../types";

import Layout from "../components/layout";
import Header from "../components/header";
import FeaturedPost from "../components/featured-post";
import PostsList from "../components/posts-list";

const Index = ({ data, pageContext: { nextPagePath, previousPagePath } }) => {
  const posts: Post[] = data.allWpPost.nodes;

  if (!posts.length) {
    return (
      <Layout isHomePage={true}>
        <Header title="Kaikki julkaisut" />
        <p>Ei julkaisuja.</p>
      </Layout>
    );
  }

  const firstPost: Post = posts[0];
  const nextPosts: Post[] = posts.slice(1, 4);
  const restOfPosts: Post[] = posts.slice(4);

  return (
    <Layout isHomePage={true}>
      <Header title="Kaikki julkaisut" />

      <div className="allPosts">
        <FeaturedPost post={firstPost} />
        <PostsList posts={nextPosts} highlighted={true} />
        <PostsList posts={restOfPosts} highlighted={false} />
      </div>

      {/*previousPagePath && (
        <>
          <Link to={previousPagePath}>Edellinen sivu</Link>
          <br />
        </>
      )}
      {nextPagePath && <Link to={nextPagePath}>Seuraava sivu</Link>*/}
    </Layout>
  );
};

export default Index;

export const pageQuery = graphql`
  query WordPressPostArchive($offset: Int!, $postsPerPage: Int!) {
    allWpPost(
      sort: { fields: [date], order: DESC }
      limit: $postsPerPage
      skip: $offset
    ) {
      nodes {
        uri
        date(formatString: "MMMM DD, YYYY", locale: "fi")
        title
        excerpt
        author {
          node {
            firstName
          }
        }
        additionalFields {
          authorgroup
          featuredimage
        }
      }
    }
  }
`;
