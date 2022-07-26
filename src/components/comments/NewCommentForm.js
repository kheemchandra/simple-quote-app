import { useRef, useState, Fragment } from 'react';
import Spinner from '../UI/Spinner';

import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {   
  const [isSubmitting, setIsSubmitting] = useState(false);
  const commentTextRef = useRef();
  const { quoteID } = props;

  const submitFormHandler = async(event) => {
    event.preventDefault();

    let comment = commentTextRef.current.value.trim();
    if(!comment)return; 
    
    setIsSubmitting(true);
    const response = await fetch(
      `https://films-fetch-default-rtdb.firebaseio.com/comments/${quoteID}.json/`,
      {
        method: "POST",
        body: JSON.stringify({ text: comment}),
      }
    ); 
    setIsSubmitting(false);
    props.onComment();
  };

  

  return (
    <Fragment>
      {isSubmitting && <Spinner />}
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
    </Fragment>
  );
};

export default NewCommentForm;
