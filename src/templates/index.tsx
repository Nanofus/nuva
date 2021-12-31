import React from "react";
import { Link, graphql } from "gatsby";
import parse from "html-react-parser";

import Layout from "../components/layout";
import Header from "../components/header";

import { Post } from "../types";

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

  let featuredStyle = {
    backgroundImage: "url(" + firstPost.additionalFields.featuredimage + ")",
  };

  return (
    <Layout isHomePage={true}>
      <Header title="Kaikki julkaisut" />

      <div className="allPosts">
        <div className="firstPost">
          <div className="featuredImage" style={featuredStyle}></div>
          <div className="firstPostText">
            <h2 itemProp="headline">
              <Link to={firstPost.uri} itemProp="url">
                {parse(firstPost.title)}
              </Link>
            </h2>
            <h5>
              {firstPost.additionalFields.authorgroup ? (
                <span>{firstPost.additionalFields.authorgroup}</span>
              ) : (
                <span>{firstPost.author.node.firstName}</span>
              )}
            </h5>
            <h5>{firstPost.date}</h5>
          </div>
        </div>

        <ol className="featuredPosts" style={{ listStyle: `none` }}>
          {nextPosts.map(post => {
            return (
              <li key={post.uri}>
                <h5 itemProp="headline">
                  <Link to={post.uri} itemProp="url">
                    {parse(post.title)}
                  </Link>
                </h5>
                <span className="postListField">
                  {post.additionalFields.authorgroup ? (
                    <span>{post.additionalFields.authorgroup}</span>
                  ) : (
                    <span>{post.author.node.firstName}</span>
                  )}
                </span>
                <span className="postListField">{post.date}</span>
              </li>
            );
          })}
        </ol>
        <ol className="allPosts" style={{ listStyle: `none` }}>
          {restOfPosts.map(post => {
            return (
              <li key={post.uri}>
                <span className="postListField" itemProp="headline">
                  <Link to={post.uri} itemProp="url">
                    {parse(post.title)}
                  </Link>
                </span>
                <span className="postListField">
                  {post.additionalFields.authorgroup ? (
                    <span>{post.additionalFields.authorgroup}</span>
                  ) : (
                    <span>{post.author.node.firstName}</span>
                  )}
                </span>
                <span className="postListField">
                  <small>{post.date}</small>
                </span>
              </li>
            );
          })}
        </ol>
      </div>

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
