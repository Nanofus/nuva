import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { loggedIn } from "../util";

const CommentReplyBox = ({ comment, unparentedPostId }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn());
  const [content, setContent] = useState("");
  const [addComment, { data, loading, error }] = useMutation(commentSubmitQuery, {
    onCompleted({ success }) {
      if (success) {
        setContent("");
        toast.success("Kommentti lähetetty!");
      } else {
        toast.error("Jotain meni pieleen.");
      }
    },
    onError() {
      toast.error("Kommentin lähetys epäonnistui.");
    }
  });

  const postId = unparentedPostId ? unparentedPostId : comment.commentId;
  const parentId = comment ? comment.commentId : null;

  /// HIRVEÄ PURKKA
  setInterval(() => {
    setIsLoggedIn(loggedIn());
  }, 100)

  const submit = () => {
    addComment({
      variables: {
        author: localStorage.getItem("userName"),
        commentOn: postId,
        content: content,
        parent: parentId,
        authorEmail: localStorage.getItem("userEmail"),
      },
    });
  }

  return (
    <>
      {isLoggedIn && <div className="commentReplyBox">
        <textarea value={content} onChange={e => setContent(e.target.value)}></textarea>
        <button onClick={submit}>Lähetä</button>
      </div>}
    </>
  )
}

export default CommentReplyBox;

const commentSubmitQuery = gql`
	mutation($author: String, $commentOn: Int, $parent: ID, $content: String, $authorEmail: String) {
		createComment(
			input: {
				clientMutationId: "CreateComment"
				commentOn: $commentOn
				content: $content
        parent: $parent
			}
		) {
			success
		}
	}
`;