import React from "react";
import parse from "html-react-parser";
import { Link } from "gatsby";

const FeaturedPost = ({post}) => {
  let featuredStyle = {
    backgroundImage: "url(" + post.additionalFields.featuredimage + ")",
  };

  return (
    <div className="firstPost">
      <div className="featuredImage" style={featuredStyle}></div>
      <div className="firstPostText">
        <h2 itemProp="headline">
          <Link to={post.uri} itemProp="url">
            {parse(post.title)}
          </Link>
        </h2>
        <h5>
          {post.additionalFields.authorgroup ? (
            <span>{post.additionalFields.authorgroup}</span>
          ) : (
            <span>{post.author.node.firstName}</span>
          )}
        </h5>
        <h5>{post.date}</h5>
      </div>
    </div>
  );
};

export default FeaturedPost;
