import { buildResponse, success, failure } from '../../lib/response-lib';

// open to anonymous users
async function listLegislator(user) {
  const message = 'list of legislators';
  console.log(message);
  const response = success({data: message});
  return response;
}

const collectionHandlers = {
  GET: listLegislator,
};

export default collectionHandlers;
