import logger from "../utils/winston.js";

class LoggerTestController {
    testLogger = async (req, res) => {
        try {
            logger.fatal("fatal");
            logger.error("error");
            logger.warn("warn");
            logger.info("info");
            logger.http("http");
            logger.debug("debug");
            res.json({ message: 'Test finalizado.' });
        } catch (error) {
            logger.error('Ha ocurrido un error.');
        }
    };
}

export default new LoggerTestController();