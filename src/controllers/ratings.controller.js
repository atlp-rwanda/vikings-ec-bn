
import { RatingService } from '../services/rating.service';
import {NotificationController as notify} from './notification.controller';


export const productRating = async (req, res) => {
  try {
    const { ...fields } = req.body;
    const buyerId = req.user.id;
    const productId = req.body.productId;
    const ratings = {
      ...fields,
      buyerId,
      productId,
    };
    let rate = await RatingService.getProductRatingByField({ buyerId: buyerId });
    if (rate.length !== 0) {
      await RatingService.updateRatings(ratings, rate[0].id);
      rate = await RatingService.getProductRatingByField({ id: rate[0].id });
      await notify.notifySellerAboutProductRating(rate[0]);
    } else {
      rate = await RatingService.createRatings(ratings);
      await notify.notifySellerAboutProductRating(rate);
    }
    return res
      .status(200)
      .json({ message: 'Product rated successfully', rate: rate });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'Error occurred while rating a product',
    });
  }

};

export const getRatingsBySpecificProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    const ratings = await RatingService.getProductRatingByField({productId: productId});
    return res.status(200).json({ message: 'Ratings retrived successfully', ratings: ratings });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'could not retrieve ratings try again',
    });
  }
};


