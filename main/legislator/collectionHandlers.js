import { buildResponse, success, failure } from '../../lib/response-lib';

async function createLegislator(user, id, data) {
  // uses data
  const message = 'newly created legislator';
  console.log(message);
  const response = success({ data: message });
  return response;
}

async function listLegislator(user) {
  const message = 'list of legislators';
  console.log(message);
  const response = success({ data: message });
  return response;
}

const collectionHandlers = {
  GET: listLegislator,
  POST: createLegislator,
};

export default collectionHandlers;
