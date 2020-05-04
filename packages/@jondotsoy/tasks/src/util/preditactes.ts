import ow from 'ow';

export const titlePredicate = ow.string.minLength(1).matches(/^[a-z][_|a-z|0-9]*$/i);
