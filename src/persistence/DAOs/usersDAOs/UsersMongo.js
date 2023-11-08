import { usersModel } from '../../mongo/models/users.model.js';
import config from '../../../config.js';
import CustomError from '../../../utils/errors/CustomError.js';
import {
    ErrorsName,
    ErrorsCause,
    ErrorsMessage
} from '../../../utils/errors/errors.enum.js';

export default class UsersMongo {
    async createUser(user) {
        try {
            if (!user) {
                CustomError.createCustomError({
                    name: ErrorsName.USER_DATA_INCOMPLETE,
                    cause: ErrorsCause.USER_DATA_INCOMPLETE,
                    message: ErrorsMessage.USER_DATA_INCOMPLETE,
                });
                return null;
            }
            const { email } = user;
            const userExists = await usersModel.find({ email });
            if (userExists.length === 0) {
                const newUser = await usersModel.create(user);
                return newUser;
            } else {
                CustomError.createCustomError({
                    name: ErrorsName.USER_DATA_ALREADY_EXISTS_IN_DATABASE,
                    cause: ErrorsCause.USER_DATA_ALREADY_EXISTS_IN_DATABASE,
                    message: ErrorsMessage.USER_DATA_ALREADY_EXISTS_IN_DATABASE,
                });
                return null;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async loginUser(user) {
        try {
            if (!user) {
                CustomError.createCustomError({
                    name: ErrorsName.USER_DATA_INCOMPLETE,
                    cause: ErrorsCause.USER_DATA_INCOMPLETE,
                    message: ErrorsMessage.USER_DATA_INCOMPLETE,
                });
                return null;
            }
            const { email, password } = user;
            const foundUser = await usersModel.find({ email, password });
            if (foundUser.length !== 0) {
                return foundUser;
            } else if (email === config.ADMIN_EMAIL && password === config.ADMIN_PASSWORD) {
                return [{...user, firstName: 'coder', lastName: 'house', admin: true, age: 9}];
            } else {
                CustomError.createCustomError({
                    name: ErrorsName.USER_DATA_NOT_FOUND_IN_DATABASE,
                    cause: ErrorsCause.USER_DATA_NOT_FOUND_IN_DATABASE,
                    message: ErrorsMessage.USER_DATA_NOT_FOUND_IN_DATABASE,
                });
                return null;
            }
        } catch (error) {
            console.log(error);
        }
    }
}