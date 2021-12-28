import React from "react";
import { Link, graphql } from "gatsby";
import parse from "html-react-parser";

import Layout from "../components/layout";
import Seo from "../components/seo";

import { Post } from "../types";

const Index = ({
  data,
  pageContext: { nextPagePath, previousPagePath },
}) => {
  const posts: Post[] = data.allWpPost.nodes;

  if (!posts.length) {
    return (
      <Layout isHomePage={true}>
        <Seo title="Kaikki julkaisut" />
        <p>
          Ei julkaisuja.
        </p>
      </Layout>
    );
  }

  const firstPost: Post = posts[0];
  const nextPosts: Post[] = posts.slice(1, 4);
  const restOfPosts: Post[] = posts.slice(4);

  return (
    <Layout isHomePage={true}>
      <Seo title="Kaikki julkaisut" />

      <div className="firstPost">
        <span>
          <Link to={firstPost.uri} itemProp="url">
            <span itemProp="headline">{parse(firstPost.title)}</span>
          </Link>
        </span>
        <span> </span>
        <span>{firstPost.author.node.firstName}</span>
        <span> </span>
        <small>{firstPost.date}</small>
      </div>

      <ol className="featuredPosts" style={{ listStyle: `none` }}>
        {nextPosts.map(post => {
          const title = post.title;

          return (
            <li key={post.uri}>
              <span>
                <Link to={post.uri} itemProp="url">
                  <span itemProp="headline">{parse(title)}</span>
                </Link>
              </span>
              <span> </span>
              <span>{post.author.node.firstName}</span>
              <span> </span>
              <small>{post.date}</small>
              {/*<section itemProp="description">{parse(post.excerpt)}</section>*/}
            </li>
          );
        })}
      </ol>
      <ol className="allPosts" style={{ listStyle: `none` }}>
        {restOfPosts.map(post => {
          const title = post.title;

          return (
            <li key={post.uri}>
              <span>
                <Link to={post.uri} itemProp="url">
                  <span itemProp="headline">{parse(title)}</span>
                </Link>
              </span>
              <span> </span>
              <span>{post.author.node.firstName}</span>
              <span> </span>
              <small>{post.date}</small>
              {/*<section itemProp="description">{parse(post.excerpt)}</section>*/}
            </li>
          );
        })}
      </ol>

      {previousPagePath && (
        <>
          <Link to={previousPagePath}>Edellinen sivu</Link>
          <br />
        </>
      )}
      {nextPagePath && <Link to={nextPagePath}>Seuraava sivu</Link>}
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
        date(formatString: "MMMM DD, YYYY")
        title
        excerpt
        author {
          node {
            firstName
          }
        }
      }
    }
  }
`;
