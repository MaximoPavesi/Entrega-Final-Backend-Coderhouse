import { faker } from '@faker-js/faker';
import { productsModel } from '../../mongo/models/products.model.js';
import CustomError from '../../../utils/errors/CustomError.js';
import {
    ErrorsName,
    ErrorsCause,
    ErrorsMessage
} from '../../../utils/errors/errors.enum.js';

export default class ProductsMongo {
    async addProduct(product) {
        try {
            if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock || !product.category || !product.status) {
                CustomError.createCustomError({
                    name: ErrorsName.PRODUCT_DATA_INCOMPLETE,
                    cause: ErrorsCause.PRODUCT_DATA_INCOMPLETE,
                    message: ErrorsMessage.PRODUCT_DATA_INCOMPLETE,
                });
                return null;
            }
            const newProduct = await productsModel.create(product);
            return newProduct;
        } catch (error) {
            console.log(error);
        }
    }

    async getProducts(queries) {
        try {
            const { limit = 10, page = 1, order, category } = queries;
            let products;
            let prevLink;
            let nextLink;
            if (order && category) {
                products = await productsModel.paginate({ category: category }, { limit: limit, page: page, sort: { price: order } });
                prevLink = products.hasPrevPage ? `http://localhost:8080/api/products?page=${products.prevPage}&limit=${limit}&category=${category}&order=${order}` : null;
                nextLink = products.hasNextPage ? `http://localhost:8080/api/products?page=${products.nextPage}&limit=${limit}&category=${category}&order=${order}` : null
            } else if (order) {
                products = await productsModel.paginate({}, { limit: limit, page: page, sort: { price: order } });
                prevLink = products.hasPrevPage ? `http://localhost:8080/api/products?page=${products.prevPage}&limit=${limit}&order=${order}` : null;
                nextLink = products.hasNextPage ? `http://localhost:8080/api/products?page=${products.nextPage}&limit=${limit}&order=${order}` : null
            } else if (category) {
                products = await productsModel.paginate({ category: category }, { limit: limit, page: page });
                prevLink = products.hasPrevPage ? `http://localhost:8080/api/products?page=${products.prevPage}&limit=${limit}&category=${category}` : null;
                nextLink = products.hasNextPage ? `http://localhost:8080/api/products?page=${products.nextPage}&limit=${limit}&category=${category}` : null
            } else {
                products = await productsModel.paginate({}, { limit: limit, page: page });
                prevLink = products.hasPrevPage ? `http://localhost:8080/api/products?page=${products.prevPage}&limit=${limit}` : null;
                nextLink = products.hasNextPage ? `http://localhost:8080/api/products?page=${products.nextPage}&limit=${limit}` : null
            }
            const results = {
                status: 'success',
                payload: products.docs,
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink: prevLink,
                nextLink: nextLink,
            }
            return results;
        } catch (error) {
            console.log(error);
        }
    }

    async getMockingProducts() {
        try {
            const mockingProducts = [];
            for (let i = 0; i < 100; i++) {
                const product = await productsModel.create({
                    title: faker.commerce.productName(),
                    description: faker.commerce.productDescription(),
                    price: faker.commerce.price(),
                    thumbnail: faker.image.imageUrl(),
                    code: faker.random.alphaNumeric(6),
                    stock: faker.random.numeric(),
                    category: faker.commerce.department()
                });
                mockingProducts.push(product);
            }
            return mockingProducts;
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(id){
        try {
            if (id.length !== 24) {
                CustomError.createCustomError({
                    name: ErrorsName.PRODUCT_DATA_INCORRECT_ID,
                    cause: ErrorsCause.PRODUCT_DATA_INCORRECT_ID,
                    message: ErrorsMessage.PRODUCT_DATA_INCORRECT_ID
                });
                return null;
            }
            const product = productsModel.findById(id);
            if (!product) {
                CustomError.createCustomError({
                    name: ErrorsName.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
                    cause: ErrorsCause.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
                    message: ErrorsMessage.PRODUCT_DATA_NOT_FOUND_IN_DATABASE
                });
                return null;
            }
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(id, newProduct){
        try {
            if (id.length !== 24) {
                CustomError.createCustomError({
                    name: ErrorsName.PRODUCT_DATA_INCORRECT_ID,
                    cause: ErrorsCause.PRODUCT_DATA_INCORRECT_ID,
                    message: ErrorsMessage.PRODUCT_DATA_INCORRECT_ID
                });
                return null;
            }
            const product = await productsModel.findById(id);
            if (!product) {
                CustomError.createCustomError({
                    name: ErrorsName.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
                    cause: ErrorsCause.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
                    message: ErrorsMessage.PRODUCT_DATA_NOT_FOUND_IN_DATABASE
                });
                return null;
            }
            if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.thumbnail || !newProduct.code || !newProduct.stock || !newProduct.category) {
                CustomError.createCustomError({
                    name: ErrorsName.PRODUCT_DATA_INCOMPLETE,
                    cause: ErrorsCause.PRODUCT_DATA_INCOMPLETE,
                    message: ErrorsMessage.PRODUCT_DATA_INCOMPLETE,
                });
                return null;
            }
            const updatedProduct = await productsModel.findByIdAndUpdate(id, {
                title: newProduct.title,
                description: newProduct.description,
                price: newProduct.price,
                thumbnail: newProduct.thumbnail, 
                code: newProduct.code,
                stock: newProduct.stock,
                category: newProduct.category
            }, { new: true });
            updatedProduct.save();
            return updatedProduct;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id){
        try {
            if (id.length !== 24) {
                CustomError.createCustomError({
                    name: ErrorsName.PRODUCT_DATA_INCORRECT_ID,
                    cause: ErrorsCause.PRODUCT_DATA_INCORRECT_ID,
                    message: ErrorsMessage.PRODUCT_DATA_INCORRECT_ID
                });
                return null;
            }
            const deletedProduct = await productsModel.findByIdAndDelete(id);
            if (!deletedProduct) {
                CustomError.createCustomError({
                    name: ErrorsName.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
                    cause: ErrorsCause.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
                    message: ErrorsMessage.PRODUCT_DATA_NOT_FOUND_IN_DATABASE
                });
                return null;
            }
            return deletedProduct;
        } catch (error) {
            console.log(error);
        }
    }
}