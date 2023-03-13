
import { Ratings } from '../database/models/index';

export class RatingService {
   
  static async createRatings(rate) {
    return await Ratings.create(rate);
  }
 static async getProductRatingByField(condition){
 return await Ratings.findOne({
    where: {...condition},
    });
    
}
static async updateRatings(fields, id) {
  return await Ratings.update({ ...fields }, { where: { id: id } });
}
}