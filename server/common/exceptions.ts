import * as _ from 'lodash'

class EEBookBaseException extends Error {
    constructor() {
        super();
        if (this.constructor === EEBookBaseException) {
            throw new TypeError('Abstract class cannot be instantiated directly.')
        }
    }
}

// TODO: Error messages spec url
class EEBookErrorResponse extends EEBookBaseException {
    errors: Array<any>;
    status: number;
    constructor(errors, status_code) {
        super();
        this.errors = [];
        let self = this;

        _.forEach(errors, (error) => {
        });
    }
}

export { EEBookErrorResponse };
