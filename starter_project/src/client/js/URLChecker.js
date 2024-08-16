const validURL = require('valid-url');

const checkURL = (url)=>{
    
  return Boolean(validURL.isWebUri(url));
   
}
export {checkURL}