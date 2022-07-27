import { useState, useEffect, Fragment, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NewCommentForm from "./NewCommentForm";
import CommentsList from "./CommentsList";
import Spinner from "../UI/Spinner";
import { fetchData } from "../../store/actions";
import { commentActions } from "../../store/commentsSlice";

import classes from "./Comments.module.css";

const Comments = () => {
  const dispatch = useDispatch();
  const comments = useSelector((store) => store.comments.comments);
  const [spinning, setSpinning] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [isAddingComment, setIsAddingComment] = useState(false);

  const { id: quoteID } = useParams(); 

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
    const URL = `https://films-fetch-default-rtdb.firebaseio.com/comments/${quoteID}.json/`;
    
    const applyData = (data) => {
      const commentsArr = [];
      for (const id in data) {
        const cmtId = quoteID + " " + id;
        const comment = { id: cmtId, text: data[id].text };
        commentsArr.unshift(comment);
      } 
      dispatch(commentActions.updateComments(commentsArr));
    };
    const cbs = {
      beforeCB: () => {
        setSpinning(true);
      },
      afterCB: () => {
        setSpinning(false);
      },
    };

    dispatch(fetchData({URL,applyData}, cbs)); 
  }, [quoteID, dispatch]);

   
  useEffect(() => {
    if (submitted) {
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
        {isAddingComment && (
          <NewCommentForm quoteID={quoteID} onComment={commentHandler} />
        )}
        {spinning && <Spinner />}
        {!spinning && content}
      </section>
    </Fragment>
  );
};

export default Comments;
