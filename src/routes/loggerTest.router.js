import { Router } from 'express';
import LoggerTestController from '../controllers/loggerTest.controller.js';

class LoggerTestRouter {
    constructor() {
        this.router = Router();
        this.router.get('/', LoggerTestController.testLogger);
    }

    getRouter() {
        return this.router;
    }
}

export default new LoggerTestRouter();