
import { RatingService } from '../services/rating.service';



export const productRating = async (req, res) => {
  try {
    const { ...fields } = req.body;
    const buyerId = req.user.id;
    const productId = req.product.id;
    const ratings = {
      ...fields,
      buyerId,
      productId,
    };
    let rate = await RatingService.getProductRatingByField({ buyerId: buyerId });

    if (rate) {
      await RatingService.updateRatings(ratings, rate.id);
      rate = await RatingService.getProductRatingByField({ id: rate.id });
    }
    else {
      rate = await RatingService.productRating(ratings);
    }
    return res
      .status(201)
      .json({ message: 'Product rated successfully', rate: rate });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'Error occured while rating a product',
    });
  }

};




