import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const createStripeSession = async(lineItems, customer) =>{
  return await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			shipping_address_collection: {
				allowed_countries: ['RW', 'UG'],
			},
			shipping_options: [
				{
					shipping_rate_data: {
						type: 'fixed_amount',
						fixed_amount: {
							amount: 0,
							currency: 'rwf',
						},
						display_name: 'Free shipping',
						delivery_estimate: {
							minimum: {
								unit: 'business_day',
								value: 5,
							},
							maximum: {
								unit: 'business_day',
								value: 8,
							},
						},
					},
				},
				{
					shipping_rate_data: {
						type: 'fixed_amount',
						fixed_amount: {
							amount: 10000,
							currency: 'rwf',
						},
						display_name: 'Next day air',
						delivery_estimate: {
							minimum: {
								unit: 'business_day',
								value: 1,
							},
							maximum: {
								unit: 'business_day',
								value: 1,
							},
						},
					},
				},
			],
			phone_number_collection: {
				enabled: true,
			},
			customer: customer.id,
			line_items: lineItems,
			mode: 'payment',
			success_url: `${process.env.PAYMENT_BASE_URL}/success`,
			cancel_url: `${process.env.PAYMENT_BASE_URL}/cancel`,
		});
};
