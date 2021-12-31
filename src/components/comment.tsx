import React from "react";

const Comment = ({ comment }) => {
  return (
    <div>
      <div><h6>{comment.author.node ? comment.author.node.name : "???"}</h6> <strong>{comment.date}</strong> <p dangerouslySetInnerHTML={{ __html: comment.content }}></p></div>
      <div className="childComments">
        {comment.children &&
          comment.children.map((comment, i) => <Comment comment={comment} key={i} />)}
      </div>
    </div>
  )
}

export default Comment;