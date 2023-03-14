import authenticationRouteDocs from './authentication.doc';
import basicInfo from './basicInfo';
import userRouteDocs from './user.docs';
import welcomeRouteDocs from './welcome.docs';
import profileDocs from './profile.docs.js';
import confirmEmailRoute from './emailVerification.js';
import { productDocs, category } from './products.docs';
import cartRouteDocs from './cart.docs';
import chat from './chat.docs';
import sales from './sales.docs';
import orders from './order.docs';
import wishlist from '../documentation/wishlist.docs';
import notifications from './notifications.doc';
import payments from './payment.docs';
import ratings from './ratings.doc';
import stats from './stats.docs';

export default {
  ...basicInfo,
  paths: {
    ...welcomeRouteDocs,
    ...authenticationRouteDocs,
    ...userRouteDocs,
    ...profileDocs,
    ...confirmEmailRoute,
    ...productDocs,
    ...cartRouteDocs,
    ...chat,
    ...wishlist,
    ...sales,
    ...orders,
    ...payments,
    ...ratings,
    ...notifications,
    ...stats,
    ...category
  },
};
