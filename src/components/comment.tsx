import React from "react";

const Comment = (props) => {
    return (
        <div>
            <div><h6>{props.comment.author.node ? props.comment.author.node.name : "???"}</h6> <strong>{props.comment.date}</strong> <p dangerouslySetInnerHTML={{ __html: props.comment.content }}></p></div>
            <div className="childComments">
                {props.comment.children &&
                    props.comment.children.map((comment, i) => <Comment comment={comment} key={i} />)}
            </div>
        </div>
    )
}

export default Comment;