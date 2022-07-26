import { useState, useEffect, Fragment, useCallback } from "react";
import { useParams  } from "react-router-dom";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import CommentsList from "./CommentsList";
import Spinner from "../UI/Spinner"; 

const Comments = () => {
  const [spinning, setSpinning] = useState(); 
  const [submitted, setSubmitted] = useState(false);
  const [isAddingComment, setIsAddingComment] = useState(false);

  const { id: quoteID } = useParams();

  const [comments, setComments] = useState([]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const commentHandler = () => {
    setSubmitted(true);
  };

  let content = (
    <p style={{ margin: "2.5rem 0" }}>No comments were added yet!</p>
  );
  if (comments.length) {
    content = <CommentsList comments={comments} />;
  }

  const fetchComments = useCallback(async () => {
    setSpinning(true);
    const response = await fetch(`https://films-fetch-default-rtdb.firebaseio.com/comments/${quoteID}.json/`);
    const data = await response.json(); 
    const fetchedCommentsArr = [];
    for(const id in data){
      const cmtId = quoteID+' '+id;
      const comment = {id: cmtId, text: data[id].text};
      fetchedCommentsArr.unshift(comment);
    }
    setComments(fetchedCommentsArr);
    setSpinning(false);
  }, [quoteID]);

  useEffect(() => {
    if(submitted){
      fetchComments();
      setSubmitted(false);
    }
  }, [submitted, fetchComments]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <Fragment> 
    <section className={classes.comments}>
      <h2>User Comments</h2> 
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteID={quoteID} onComment={commentHandler}/>}
      {spinning && <Spinner />}
      {!spinning && content}
    </section></Fragment>
  );
};

export default Comments;
