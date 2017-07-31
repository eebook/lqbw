import * as _ from 'lodash';
import { EEBookErrorResponse } from './exceptions';
import eebLogger from 'logger/logger';

const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';


