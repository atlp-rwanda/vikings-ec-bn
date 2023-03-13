

export const ratingMaxAndMinNumber = async (req, res, next) => {
    const rate = req.body.rate;
    if (rate <0 || rate >5 ){
       return res.status(400).json({
      message: 'Rate must be from 0 to 5',});
    }
      next();
  };

 