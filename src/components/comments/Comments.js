import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import CommentList from './CommentsList';
import Spinner from '../UI/Spinner';

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
  const [spinning1, setSpinning1] = useState(false);
  const [spinning2, setSpinning2] = useState(false);
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
    setSpinning2(true);
    setTimeout(() => {
      setSpinning2(false);       
      setComments(structuredClone(COMMENTS[quoteID]));
    }, 350)
  };

  let content = <p style={{margin: '2.5rem 0'}}>No comments were added yet!</p>;
  if(comments.length){
    content = <CommentList comments={comments} />;
  }

  useEffect(() => {
    if(!spinning2){ 
      setSpinning1(true);
      setTimeout(() => {
        setSpinning1(false);
      }, 350);
    }
  }, [spinning2]);
 
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      { spinning2 && <Spinner /> }
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm onComment={newCommmentHandler}/>}
      { spinning1 && <Spinner/> }
      { !spinning1 && content }
    </section>
  );
};

export default Comments;
