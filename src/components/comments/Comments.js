import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import CommentList from './CommentsList';
import Spinner from '../UI/Spinner';

import { useSpinner } from '../../hooks/use-Spinner';

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
  const { spinning:spinning1, setSpinning:setSpinning1, toggleSpinner:toggleSpinner1 } = useSpinner(false);
  const { spinning:spinning2, setSpinning:setSpinning2, toggleSpinner:toggleSpinner2 } = useSpinner(false);
  
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
    const cb = () => {
      setComments(structuredClone(COMMENTS[quoteID]));
    };

    setSpinning2(true);
    toggleSpinner2(null, cb); 
  };

  let content = <p style={{margin: '2.5rem 0'}}>No comments were added yet!</p>;
  if(comments.length){
    content = <CommentList comments={comments} />;
  }

  useEffect(() => { 
    if(!spinning2){ 
      setSpinning1(true);
      toggleSpinner1(); 
    }
  }, [spinning2, setSpinning1, toggleSpinner1]);
 
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
