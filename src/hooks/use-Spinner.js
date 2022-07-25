import { useState, useCallback } from 'react';
 


export const useSpinner = (init) => {
  const [spinning, setSpinning] = useState(init);

  const toggleSpinner = useCallback((delay, cb) => {
    setTimeout(() => {
      setSpinning(prev => !prev);
      if(cb)cb();
    }, delay || 350);
  }, []);

  return {
    spinning,
    setSpinning,
    toggleSpinner
  }
};
