import Constants from '../constants';

const { STAGE: stage } = process.env;

export const logError = (error) => {
  console.error('Error: ', error.message, '\n\nStack: ', error.stack);
}

export const logDebug = () => {
  if (Constants.debug && stage !== 'prod') {
    console.log(arguments);
  }
}
