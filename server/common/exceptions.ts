import * as _ from 'lodash';

class EEBookBaseException extends Error {
    constructor() {
        super();
        if (this.constructor === EEBookBaseException) {
            throw new TypeError('Abstract class cannot be instantiated directly.');
        }
    }
}

// TODO: Error messages spec url
export class EEBookErrorResponse extends EEBookBaseException {
    errors: Array<any>;
    status: number;
    constructor(_errors, status_code) {
        super();
        this.errors = [];
        const self = this;
        console.log('_error? %j', _errors);

        _.forEach(_errors, (error) => {
            self.errors.push(_.pick(error, ['code', 'source', 'message', 'fields']));
            self.message = error.message;
        });
        this.status = status_code;
    }

    data() {
        return this.errors;
    }
}

export default EEBookErrorResponse;
