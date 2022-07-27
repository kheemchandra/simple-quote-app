export const fetchData = ({URL, method, data, applyData}, cbs) => {
  return async (dispatch) => {
    const { beforeCB, afterCB } = cbs;
    if(beforeCB) beforeCB();
    const res = await fetch(URL,{
      method: method? method: 'GET',
      body: data ? JSON.stringify(data) : null
    });
    if(applyData){
      const resData = await res.json(); 
      applyData(resData);
    }    
    if(afterCB) afterCB();
  }
}
