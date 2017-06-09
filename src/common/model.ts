import * as _ from 'lodash';
import { APIRequest } from './request';

class User {
    username: String;
    token: String;
    constructor (username, token) {
        this.username = username;
        this.token = token;
    }

    get isAuthenticated() {
        return this.username && this.token;
    }
}


export { User };