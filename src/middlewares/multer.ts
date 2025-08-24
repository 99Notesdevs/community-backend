import multer from 'multer';
import logger from '../utils/logger';

logger.info("Initializing multer for file uploads");
const storage = multer.memoryStorage();
logger.info("Multer storage initialized");

export const upload = multer({ storage });
