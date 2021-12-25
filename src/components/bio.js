/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
//import { useStaticQuery, graphql } from "gatsby"

const Bio = (props) => {
  const author = props.author.node;

  const avatarUrl = author?.avatar?.url;

  return (
    <div className="bio">
      {avatarUrl && (
        <img
          alt={author?.firstName || ``}
          className="bio-avatar"
          src={avatarUrl}
        />
      )}
      {author?.firstName && (
        <p>
          Written by <strong>{author.firstName}</strong>
          {` `}
          {author?.description || null}
          {` `}
          {author?.twitter && (
            <a href={`https://twitter.com/${author?.twitter || ``}`}>
              You should follow them on Twitter
            </a>
          )}
        </p>
      )}
    </div>
  )
}

export default Bio
