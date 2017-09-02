import * as express from 'express';

import { EEBookRequest } from '../common/request';
import eebookLogger from '../logger/logger';

const logger = eebookLogger.logger;
const router = express.Router();

// router.