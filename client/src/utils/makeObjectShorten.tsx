import { IAnyObject } from 'types';

const makeObjectShorten = (object: IAnyObject) => ({
    variables: {
        input: object,
    },
});

export default makeObjectShorten;
