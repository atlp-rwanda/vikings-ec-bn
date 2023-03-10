import Stripe from 'stripe';
import { OrderService } from '../services/order.service';
import { PaymentService } from '../services/payment.service';
import { SalesService } from '../services/sales.service';
import { calculateCartTotal } from '../utils/cart.util';
import { createStripeSession } from '../utils/payment.util';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeCheckoutSession = async (req, res) => {
	try {
		const cart = req.cart;
		const user = req.user;
		const lineItems = req.lineItems;
		const productsDetails = req.productsDetails;
		const cartTotal = calculateCartTotal(productsDetails);
		const payment = await PaymentService.createPayment({ status: 'pending' });

		const customer = await stripe.customers.create({
			metadata: {
				userId: user.id,
				cart: JSON.stringify(cart),
				paymentId: payment.id,
			},
		});
		const session = await createStripeSession(lineItems, customer);
		return res.status(200).json({
			cartTotal: cartTotal,
			message: 'Creating checkout session successful',
			url: session.url,
		});
	} catch (error) {
		return res
			.status(500)
			.json({
				error: error.message,
				message: 'Could not create checkout session',
			});
	}
};

export const webHook = async (req, res) => {
	const event = req.event;
	const data = event.data.object;
	const eventType = event.type;

  let order;
  if (eventType === 'checkout.session.completed') {
    try {
      const customer = await stripe.customers.retrieve(data.customer);
      order = await OrderService.createNewOrder(customer, data);
      await PaymentService.updatePayment({ status: 'Paid' }, order.paymentId);
      const cart = JSON.parse(customer.metadata.cart);
      const { products } = cart;
      const orderId = order.id;
      const sales = await Promise.all(
        products.map(async (product, index) => {
          const sale = {
            orderId,
            productId: product.productId,
            quantitySold: products[index].quantity,
          };
          return await SalesService.createSales(sale);
        })
      );

      return res.status(200).json({
        message: 'Order created successfully',
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: 'Could not retrieve customer data',
      });
    }
  }
};

export const stripeSuccess = (req, res) => {
	return res.status(200).json({ message: 'Payment completed successfully' });
};

export const stripeCancel = (req, res) => {
	return res.status(200).json({ message: 'Payment canceled' });
};
