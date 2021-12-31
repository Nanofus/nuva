/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react";
//import { useStaticQuery, graphql } from "gatsby"

const Bio = props => {
  const author = props.author?.node;
  const authors = props.authors ? props.authors.split(',').map(author => author.trim()) : null;

  return (
    <div className="bio">
      {author?.avatar?.url && (
        <img
          alt={author?.firstName || ``}
          className="bio-avatar"
          src={author?.avatar?.url}
        />
      )}
      {author?.firstName && (
        <p>
          Kirjoittanut <strong>{author?.firstName}</strong>
          {` `}
          {author?.description || null}
        </p>
      )}
      {authors && (
        <p>
          Kirjoittaneet <br/><br/><strong>{authors.map((author, i) => <span key={i}>{author}<br /></span>)}</strong>
        </p>
      )}
    </div>
  );
};

export default Bio;
