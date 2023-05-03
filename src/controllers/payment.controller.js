import Stripe from 'stripe';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { PaymentService } from '../services/payment.service';
import { ProductService } from '../services/product.service';
import { SalesService } from '../services/sales.service';
import { createStripeSession } from '../utils/payment.util';
import { NotificationController as notify } from './notification.controller';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeCheckoutSession = async (req, res) => {
	try {
		const cart = req.cart;
		const user = req.user;
		const lineItems = req.lineItems;
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
			message: 'Creating checkout session successful',
			url: session.url,
			sessionId: session.id
		});
	} catch (error) {
		return res.status(500).json({
			error: error.message,
			message: 'Could not create checkout session',
		});
	}
};

export const stripeSuccess = async (req, res) => {
	try {
		const { paymentId } = req.query;
		let data = await stripe.checkout.sessions.retrieve(paymentId);
		if (process.env.NODE_ENV === 'test')
			data.payment_status = 'paid';
		let order;
		if (data.payment_status === 'paid') {
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
					await ProductService.updateQuantity(product.productId, products[index].quantity);
					return await SalesService.createSales(sale);
				})
			);
			await notify.notifySellersOnBuyProduct(sales, customer.metadata.userId);

			await CartService.deleteCart(cart.id);
		}
		return res.redirect(`${process.env.FRONTEND_URL}/payments/success/${order.id}`);
	} catch (error) {
		return res.status(500).json({
			error: error.message,
			message: 'Order not created',
		});
	}
};

export const stripeCancel = (req, res) => {
	return res.status(200).json({ message: 'Payment canceled' });
};
