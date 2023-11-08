import mongoose from 'mongoose';
import config from '../../config.js';
import logger from '../../utils/winston.js';

(async () => {
    try {
        await mongoose.connect(config.MONGO_URL);
        logger.info('Conectado a la base de datos correctamente.');
    } catch (error) {
        logger.error('Error de conexión a la base de datos.');
        logger.error(error);
    }
})();