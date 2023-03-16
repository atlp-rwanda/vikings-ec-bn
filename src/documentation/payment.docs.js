import responses from './responses';

const createCheckoutSession = {
  tags: ['Payments'],
  summary: 'Create checkout session',
  description: 'Create a checkout session to get a form to perform payment',
  responses,
  security: [
    {
      bearerAuth: [],
    }
  ]
};

const payments = {
  '/api/v1/payments/create-checkout-session':{
    post: createCheckoutSession
  }

};

export default payments;
