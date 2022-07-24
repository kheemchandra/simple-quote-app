import { useState } from 'react';
import { useParams } from 'react-router-dom';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import CommentList from './CommentsList';

const COMMENTS = {
  q1: [
    {id: 'q1_cmt_1', text: 'Hi there'},
    {id: 'q1_cmt_2', text: 'It is rainy season.'},
  ],
  q2: [
    {id: 'q2_cmt_1', text: 'Hello how are you?'},
    {id: 'q2_cmt_2', text: 'Learning react nowadays'},
  ],  
};

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const { id:quoteID } = useParams();
  const [comments, setComments] = useState(structuredClone(COMMENTS[quoteID]) || []);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  
  const newCommmentHandler =  (comment) => {
    if(!COMMENTS[quoteID]){
      COMMENTS[quoteID] = [];
    }
    COMMENTS[quoteID].unshift({
      id: `${quoteID}_cmt_${Math.random()}`,
      text: comment
    });
    setComments(structuredClone(COMMENTS[quoteID]));
  };

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm onComment={newCommmentHandler}/>}
      { (comments.length === 0) && <p>No comments were added yet!</p>}
      { (comments.length !== 0) && <CommentList comments={comments} />}
    </section>
  );
};

export default Comments;
