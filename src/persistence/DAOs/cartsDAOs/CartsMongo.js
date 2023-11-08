import { cartsModel } from '../../mongo/models/carts.model.js';
import CustomError from '../../../utils/errors/CustomError.js';
import {
    ErrorsName,
    ErrorsCause,
    ErrorsMessage
} from '../../../utils/errors/errors.enum.js';

export default class CartsMongo {
    async addCart() {
        try{
            const newCart = await cartsModel.create({ products: [] });
            return newCart
        } catch (error) {
            console.log(error)
        }
    }

    async getProductsFromCart(cartId) {
        try {
            if (cartId.length !== 24) {
                CustomError.createCustomError({
                    name: ErrorsName.CART_DATA_INCORRECT_ID,
                    cause: ErrorsCause.CART_DATA_INCORRECT_ID,
                    message: ErrorsMessage.CART_DATA_INCORRECT_ID
                });
                return null;
            }
            const cart = await cartsModel.find({ _id: cartId });
            if (!cart) {
                CustomError.createCustomError({
                    name: ErrorsName.CART_DATA_NOT_FOUND_IN_DATABASE,
                    cause: ErrorsCause.CART_DATA_NOT_FOUND_IN_DATABASE,
                    message: ErrorsMessage.CART_DATA_NOT_FOUND_IN_DATABASE
                });
                return null;
            }
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            if (cartId.length !== 24) {
                CustomError.createCustomError({
                    name: ErrorsName.CART_DATA_INCORRECT_ID,
                    cause: ErrorsCause.CART_DATA_INCORRECT_ID,
                    message: ErrorsMessage.CART_DATA_INCORRECT_ID
                });
                return null;
            }
            if (productId.length !== 24) {
                CustomError.createCustomError({
                    name: ErrorsName.PRODUCT_DATA_INCORRECT_ID,
                    cause: ErrorsCause.PRODUCT_DATA_INCORRECT_ID,
                    message: ErrorsMessage.PRODUCT_DATA_INCORRECT_ID
                });
                return null;
            }
            const cart = await cartsModel.findById(cartId);
            if (!cart) {
                CustomError.createCustomError({
                    name: ErrorsName.CART_DATA_NOT_FOUND_IN_DATABASE,
                    cause: ErrorsCause.CART_DATA_NOT_FOUND_IN_DATABASE,
                    message: ErrorsMessage.CART_DATA_NOT_FOUND_IN_DATABASE
                });
                return null;
            }
            const product = await productsModel.findById(productId);
            if (!product) {
                CustomError.createCustomError({
                    name: ErrorsName.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
                    cause: ErrorsCause.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
                    message: ErrorsMessage.PRODUCT_DATA_NOT_FOUND_IN_DATABASE
                });
                return null;
            }
            if ((cart.products).find(product => JSON.stringify(product._id).replace('"', '').replace('"', '') === productId)) {
                CustomError.createCustomError({
                    name: ErrorsName.PRODUCT_DATA_ALREADY_IN_CART,
                    cause: ErrorsCause.PRODUCT_DATA_ALREADY_IN_CART,
                    message: ErrorsMessage.PRODUCT_DATA_ALREADY_IN_CART
                });
                return null;
            }
            cart.products.push({ _id: productId, quantity: 1 });
            cart.save();
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProductInCart(cartId, productId) {
        try {
            if (cartId.length !== 24) {
                CustomError.createCustomError({
                    name: ErrorsName.CART_DATA_INCORRECT_ID,
                    cause: ErrorsCause.CART_DATA_INCORRECT_ID,
                    message: ErrorsMessage.CART_DATA_INCORRECT_ID
                });
                return null;
            }
            if (productId.length !== 24) {
                CustomError.createCustomError({
                    name: ErrorsName.PRODUCT_DATA_INCORRECT_ID,
                    cause: ErrorsCause.PRODUCT_DATA_INCORRECT_ID,
                    message: ErrorsMessage.PRODUCT_DATA_INCORRECT_ID
                });
                return null;
            }
            const cart = await cartsModel.findById(cartId);
            if (!cart) {
                CustomError.createCustomError({
                    name: ErrorsName.CART_DATA_NOT_FOUND_IN_DATABASE,
                    cause: ErrorsCause.CART_DATA_NOT_FOUND_IN_DATABASE,
                    message: ErrorsMessage.CART_DATA_NOT_FOUND_IN_DATABASE
                });
                return null;
            }
            const product = await productsModel.findById(productId);
            if (!product) {
                CustomError.createCustomError({
                    name: ErrorsName.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
                    cause: ErrorsCause.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
                    message: ErrorsMessage.PRODUCT_DATA_NOT_FOUND_IN_DATABASE
                });
                return null;
            }
            const productInCart = cart.products.find(product => product._id === productId);
            if (!productInCart) {
                CustomError.createCustomError({
                    name: ErrorsName.PRODUCT_DATA_NOT_FOUND_IN_CART,
                    cause: ErrorsCause.PRODUCT_DATA_NOT_FOUND_IN_CART,
                    message: ErrorsMessage.PRODUCT_DATA_NOT_FOUND_IN_CART
                });
                return null;
            }
            const filteredProducts = cart.products.filter(product => product._id === productId);
            cart.products = filteredProducts;
            cart.save();
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async replaceProductsInCart(cartId, products) {
        try {
            if (cartId.length !== 24) {
                CustomError.createCustomError({
                    name: ErrorsName.CART_DATA_INCORRECT_ID,
                    cause: ErrorsCause.CART_DATA_INCORRECT_ID,
                    message: ErrorsMessage.CART_DATA_INCORRECT_ID
                });
                return null;
            }
            const cart = await cartsModel.findById(cartId);
            if (!cart) {
                CustomError.createCustomError({
                    name: ErrorsName.CART_DATA_NOT_FOUND_IN_DATABASE,
                    cause: ErrorsCause.CART_DATA_NOT_FOUND_IN_DATABASE,
                    message: ErrorsMessage.CART_DATA_NOT_FOUND_IN_DATABASE
                });
                return null;
            }
            cart.products = products;
            cart.save();
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async updateProductInCart(cartId, productId, quantity) {
        try {
            if (cartId.length !== 24) {
                CustomError.createCustomError({
                    name: ErrorsName.CART_DATA_INCORRECT_ID,
                    cause: ErrorsCause.CART_DATA_INCORRECT_ID,
                    message: ErrorsMessage.CART_DATA_INCORRECT_ID
                });
                return null;
            }
            const cart = await cartsModel.findById(cartId);
            if (!cart) {
                CustomError.createCustomError({
                    name: ErrorsName.CART_DATA_NOT_FOUND_IN_DATABASE,
                    cause: ErrorsCause.CART_DATA_NOT_FOUND_IN_DATABASE,
                    message: ErrorsMessage.CART_DATA_NOT_FOUND_IN_DATABASE
                });
                return null;
            }
            const productInCart = cart.products.find(product => product._id === productId);
            if (!productInCart) {
                CustomError.createCustomError({
                    name: ErrorsName.PRODUCT_DATA_NOT_FOUND_IN_CART,
                    cause: ErrorsCause.PRODUCT_DATA_NOT_FOUND_IN_CART,
                    message: ErrorsMessage.PRODUCT_DATA_NOT_FOUND_IN_CART
                });
                return null;
            }
            productInCart.quantity = quantity;
            cart.save();
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async emptyCart(cartId) {
        try {
            if (cartId.length !== 24) {
                CustomError.createCustomError({
                    name: ErrorsName.CART_DATA_INCORRECT_ID,
                    cause: ErrorsCause.CART_DATA_INCORRECT_ID,
                    message: ErrorsMessage.CART_DATA_INCORRECT_ID
                });
                return null;
            }
            const cart = await cartsModel.findById(cartId);
            if (!cart) {
                CustomError.createCustomError({
                    name: ErrorsName.CART_DATA_NOT_FOUND_IN_DATABASE,
                    cause: ErrorsCause.CART_DATA_NOT_FOUND_IN_DATABASE,
                    message: ErrorsMessage.CART_DATA_NOT_FOUND_IN_DATABASE
                });
                return null;
            }
            cart.products = [];
            cart.save();
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async completePurchase(cartId, user) {
        const unavailableProducts = [];
        const purchasedProducts = [];
        let total = 0;
        try {
            if (cartId.length !== 24) {
                CustomError.createCustomError({
                    name: ErrorsName.CART_DATA_INCORRECT_ID,
                    cause: ErrorsCause.CART_DATA_INCORRECT_ID,
                    message: ErrorsMessage.CART_DATA_INCORRECT_ID
                });
                return null;
            }
            const cart = await cartsModel.findById(cartId);
            if (!cart) {
                CustomError.createCustomError({
                    name: ErrorsName.CART_DATA_NOT_FOUND_IN_DATABASE,
                    cause: ErrorsCause.CART_DATA_NOT_FOUND_IN_DATABASE,
                    message: ErrorsMessage.CART_DATA_NOT_FOUND_IN_DATABASE
                });
                return null;
            }
            for (cartProduct in cart.products) {
                const product = await productsModel.findById(cartProduct._id);
                if (product.stock < cartProduct.quantity) {
                    unavailableProducts.push(cartProduct);
                } else {
                    product.stock -= cartProduct.quantity;
                    total += product.price * cartProduct.quantity;
                    purchasedProducts.push(cartProduct);
                    await product.save();
                }
            }
            cart.products = unavailableProducts;
            await cart.save();
            const tickets = await ticketsModel.find();
            if (purchasedProducts.length !== 0) {
                let newTicket;
                if (tickets.length === 0) {
                    newTicket = await ticketsModel.create({ 
                        code: '00000001',
                        purchase_datetime: Date.now(),
                        amount: total,
                        purchaser: user,
                    });
                } else {
                    const lastCode = tickets[tickets.length - 1].code;
                    const newCode = (parseInt(lastCode) + 1).toString().padStart(8, '0');
                    newTicket = await ticketsModel.create({ 
                        code: newCode,
                        purchase_datetime: Date.now(),
                        amount: total,
                        purchaser: user,
                    });
                }
                return {
                    message: 'Compra realizada con éxito.',
                    ticket: newTicket,
                    new_cart: cart,
                    unavailable_products: unavailableProducts
                }
            } else {
                return {
                    message: 'No se pudo realizar la compra por falta de stock.',
                    unavailable_products: unavailableProducts
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}