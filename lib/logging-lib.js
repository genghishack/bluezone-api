import util from 'util';
import Constants from '../constants';

const { STAGE: stage } = process.env;

export const logError = (error) => {
  console.error('Error: ', error.message, '\n\nStack: ', error.stack);
}

export function logDebug() {
  if (Constants.debug && stage !== 'prod') {
    console.log('debug: ', util.inspect(...arguments, {depth: null}));
  }
}
