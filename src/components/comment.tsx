import React from "react";
import CommentReplyBox from "./comment-reply-box";

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <div><h6>{comment.author.node ? comment.author.node.name : "???"}</h6> <strong>{comment.date}</strong> <p dangerouslySetInnerHTML={{ __html: comment.content }}></p></div>
      <CommentReplyBox comment={comment} unparentedPostId={undefined}/>
      <div className="childComments">
        {comment.children &&
          comment.children.map((comment, i) => <Comment comment={comment} key={i} />)}
      </div>
    </div>
  )
}

export default Comment;