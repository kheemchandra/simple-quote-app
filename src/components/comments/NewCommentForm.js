import { useRef, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux/es/exports';

import Spinner from '../UI/Spinner';
import { fetchData } from '../../store/actions';

import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {   
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const commentTextRef = useRef();
  const { quoteID } = props;

  const submitFormHandler = async(event) => {
    event.preventDefault();

    let comment = commentTextRef.current.value.trim();
    if(!comment)return; 
    
    const applyData = () => {
      props.onComment();
    } 

    const cbs = {
      beforeCB: () => {setIsSubmitting(true);},
      afterCB: () => {setIsSubmitting(false);},
    };
    
    dispatch(fetchData({
      URL: `https://films-fetch-default-rtdb.firebaseio.com/comments/${quoteID}.json/`,
      method: 'POST',
      data: { text: comment},
      applyData: applyData
    }, cbs));
 
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
