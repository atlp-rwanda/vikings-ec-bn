import { Ratings } from '../database/models/index';
import { User } from '../database/models';

export class RatingService {
    static async createRatings(rate) {
        return await Ratings.create(rate);
    }

    static async getProductRatingByField(condition) {
        return await Ratings.findAll({
            where: { ...condition },
            include: [
                {
                    model: User,
                    as: 'buyer',
                    attributes: {
                        exclude: [
                            'password',
                            'authCode',
                            'mustUpdatePassword',
                            'lastTimePasswordUpdated',
                        ],
                    },
                },
            ],
        });
    }

    static async updateRatings(fields, id) {
        return await Ratings.update({ ...fields }, { where: { id: id } });
    }
}
