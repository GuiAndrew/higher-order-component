import PubSub from 'pubsub-js';

class ErrorProcess {
    errorPublisher(param) {
        param.then(e => console.log(e));
        param.then(err => {
            err.errors.map((error) => {
                // return console.log(error);
                return PubSub.publish('validation-error', error);
            });
        });
    }
}

export default ErrorProcess;