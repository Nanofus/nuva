import React from "react";
import { Link, graphql } from "gatsby";
import parse from "html-react-parser";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Header from "../components/header";
import Comment from "../components/comment";

import "../css/predefined-formatting.scss";

import { PostTemplateParams, Post } from "../types";
import { newestFirst } from "../util";
import { NodeStack } from "framer-motion/types/projection/shared/stack";

const PostTemplate = ({
  data: { previous, next, post },
}: PostTemplateParams) => {
  let buildComments = comments => {
    let parentedComments = [];
    let rootComments = [];
    for (let comment of comments) {
      if (comment.children) comment.children = [];
      if (comment.parentId) {
        parentedComments.push(comment);
      } else {
        rootComments.push(comment);
      }
    }
    for (let comment of comments) {
      for (let parentedComment of parentedComments) {
        if (parentedComment.parentId === comment.id) {
          if (!comment.children) comment.children = [];
          comment.children.push(parentedComment);
        }
      }
      if (comment.children)
        comment.children = comment.children.sort(newestFirst);
    }
    rootComments = rootComments.sort(newestFirst);
    return rootComments;
  };

  let comments = buildComments(post.comments.nodes);

  return (
    <Layout>
      <Header title={post.title} description={post.excerpt} />

      <article className="post" itemScope itemType="http://schema.org/Article">
        <header>
          <h1 itemProp="headline">{parse(post.title)}</h1>
          <p>{post.date}</p>
        </header>

        <section itemProp="articleBody">
          <div
            className={
              "articleContent " +
              (post.additionalFields.initialletter
                ? "hasLargeInitialLetter"
                : null)
            }
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          {post.additionalFields.scripts && (
            <script>{post.additionalFields.scripts}</script>
          )}
          {post.additionalFields.styles && (
            <style>{post.additionalFields.styles}</style>
          )}
        </section>

        <hr />

        <section className="tags">
          <h4>Tagit</h4>
          <div className="tagContainer">
            {post.tags.nodes.map((node, i) => {
              return (
                <Link className="tag" key={i} to={"/tag/" + node.slug}>
                  {node.name}
                </Link>
              );
            })}
          </div>
        </section>

        <hr />

        <section className="comments">
          <h4>Kommentit</h4>
          {comments.map((comment, i) => (
            <Comment comment={comment} key={i} />
          ))}
        </section>

        <hr />

        <footer>
          {post.additionalFields.authorgroup ? (
            <Bio authors={post.additionalFields.authorgroup} />
          ) : (
            <Bio author={post.author} />
          )}
        </footer>
      </article>

      <nav className="post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.uri} rel="prev">
                ← {parse(previous.title)}
              </Link>
            )}
          </li>

          <li>
            {next && (
              <Link to={next.uri} rel="next">
                {parse(next.title)} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export default PostTemplate;

export const pageQuery = graphql`
  query PostById($id: String!, $previousPostId: String, $nextPostId: String) {
    post: wpPost(id: { eq: $id }) {
      id
      excerpt
      content
      title
      rawDate: date
      date(formatString: "MMMM DD, YYYY", locale: "fi")
      author {
        node {
          firstName
          description
          avatar {
            url
          }
        }
      }
      additionalFields {
        featuredimage
        scripts
        styles
        theme
        initialletter
        authorgroup
      }
      comments {
        nodes {
          author {
            node {
              name
            }
          }
          content
          rawDate: date
          date(formatString: "HH:MM MMMM DD, YYYY", locale: "fi")
          id
          parentId
        }
      }
      tags {
        nodes {
          id
          name
          slug
        }
      }
    }
    previous: wpPost(id: { eq: $previousPostId }) {
      uri
      title
    }
    next: wpPost(id: { eq: $nextPostId }) {
      uri
      title
    }
  }
`;
