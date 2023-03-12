
import {validateuuid} from '../../utils/validateuuid.util';


  export const uuidValidation = ( field) => {
   return  async (req, res, next) => {
    const uuid =  req.body[field] || req.params[field];
        const isValid = validateuuid(uuid); 
         if(!isValid){
          return res.status(400).json({message:'invalid userId'});
         }
         next();
      };
    };