import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET;
import { CartService } from '../services/cart.service';
export const getProductsDetails = async (req, res, next)=>{
  const cart = req.cart;
  const { products } = cart;
  const ids = products.map((product) => product.productId);
  const productsData = await CartService.getCartProducts(ids);
  const productsDataWithQuantity = productsData.map((product, index) => ({
			name: product.name,
			price: product.price,
			quantity: products[index].quantity,
			images: product.images,
		}));
  req.productsDetails = productsDataWithQuantity;
  next();
};

export const createLineItems = async (req, res, next)=>{
  const cart = req.cart;
  const { products } = cart;
  const ids = products.map((product) => product.productId);
  const productsData = await CartService.getCartProducts(ids);
  const lineItems = productsData.map((product, index) => ({
			price_data: {
				currency: 'rwf',
				unit_amount: product.price,
				product_data: {
					name: product.name,
					images: product.images,
					metadata: {
						id: product.id,
					},
				},
			},
			quantity: products[index].quantity,
		}));

    req.lineItems = lineItems;
    next();
};

export const createEvent = async (req, res, next)=>{
  const sig = req.headers['stripe-signature'];
  let event;

  try{
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  }
  catch(error){
    return res.status(400).json({
      error: error.message,
      message: 'Could not validate signature'
    });
  }
  req.event = event;
  next();
};
