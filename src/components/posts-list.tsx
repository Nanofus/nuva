import React from "react";
import parse from "html-react-parser";
import { Link } from "gatsby";

const PostsList = ({ posts, highlighted }) => {
  return (
    <ol className="featuredPosts" style={{ listStyle: `none` }}>
      {posts.map(post => {
        return (
          <li key={post.uri}>
            {highlighted && (
              <h5 itemProp="headline">
                <Link to={post.uri} itemProp="url">
                  {parse(post.title)}
                </Link>
              </h5>
            )}
            {!highlighted && (
              <span itemProp="headline" className="postListField">
                <Link to={post.uri} itemProp="url">
                  {parse(post.title)}
                </Link>
              </span>
            )}
            <span className="postListField">
              {post.additionalFields.authorgroup ? (
                <span>{post.additionalFields.authorgroup}</span>
              ) : (
                <span>{post.author.node.firstName}</span>
              )}
            </span>
            <span className="postListField">
              {highlighted && <small>{post.date}</small>}
              {!highlighted && <>{post.date}</>}
            </span>
          </li>
        );
      })}
    </ol>
  );
};

export default PostsList;
