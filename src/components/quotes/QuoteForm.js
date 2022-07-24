import { useRef, useEffect } from 'react'; 

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';

const QuoteForm = (props) => { 
  const authorInputRef = useRef();
  const textInputRef = useRef();

  const { isLoading, hideSpinner, onObserve } = props;

  function submitFormHandler(event) {
    event.preventDefault(); 
    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    if(!enteredAuthor.trim() || !enteredText.trim())return;

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  useEffect(() => { 
    if(!isLoading && hideSpinner){ 
      onObserve();
    }
  }, [isLoading, hideSpinner, onObserve]);

  return (
    <Card>
      <form className={classes.form} onSubmit={submitFormHandler}>
        {props.isLoading && (
          <div className={classes.loading}>
            <LoadingSpinner />
          </div>
        )}

        <div className={classes.control}>
          <label htmlFor='author'>Author</label>
          <input type='text' id='author' ref={authorInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='text'>Text</label>
          <textarea id='text' rows='5' ref={textInputRef}></textarea>
        </div>
        <div className={classes.actions}> 
            <button type='submit' className='btn'>Add Quote</button>
        </div>
      </form> 
    </Card>
  );
};

export default QuoteForm;
