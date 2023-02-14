import {AuthCodes} from '../database/models/index';

export class TwoFAAuthentication {
    static async saveAuthCode(authCode) {
        return AuthCodes.create(authCode);
    }

    static async getAuthCode(authCode) {
        return await AuthCodes.findOne({where: {value: authCode}});
    }

    static async removeAuthCode(authCode) {
        return AuthCodes.destroy({where: {value: authCode}});
    }
}
