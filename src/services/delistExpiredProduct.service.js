import models from '../database/models/index';
import { eventEmit, knownEvents, subscribe } from '../utils/events.util';
import { emailConfig } from '../utils/mail.util';
import { expiredProductMessage } from '../utils/mailTemplates.util';
import { sendEmail } from '../utils/sendEmail.util';
import { ProductService } from './product.service';
import { UserService } from './user.service';
import {knownNotificationType} from './notification.service';


export const delistExpiredProducts = async () => {
    const products = await models.Products.findAll();
    for (const product of products) {
        
        if (product.expiryDate < new Date()) {
            const isExpired = true;

            const sellerId = product.userId;
            const seller = await UserService.getUserById(sellerId);
            const sellerEmail = seller.email;

            sendEmail(emailConfig({email:sellerEmail,subject:'Product has expired', content:expiredProductMessage(product)}));

            eventEmit(knownEvents.productExpired,{product, isExpired}); 

        }
    }


};
subscribe(knownEvents.productExpired,async ({product, isExpired}) =>{
    const isAvailable=false;
    await ProductService.updateProduct({isAvailable, isExpired}, product.id);
    eventEmit(knownEvents.onNotification, {
        receiverId:product.userId,
        type:knownNotificationType.productExpired,
        message: `${product.name} has been expired`,
    });
});