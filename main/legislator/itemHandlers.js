import { buildResponse, success, failure } from '../../lib/response-lib';

async function getLegislator(user, id) {
  // uses id
  const message = 'single legislator';
  console.log(message);
  const response = success({ data: message });
  return response;
}

async function deleteLegislator(user, id) {
  // uses id
  const message = 'deleted legislator';
  console.log(message);
  const response = success({ data: message });
  return response;
}

async function patchLegislator(user, id, data) {
  // uses id, data
  const message = 'patched legislator';
  console.log(message);
  const response = success({ data: message });
  return response;
}

async function editLegislator(user, id, data) {
  // uses user, id
  const message = 'edited legislator';
  console.log(message);
  const response = success({ data: message });
  return response;
}

const itemHandlers = {
  DELETE: deleteLegislator,
  GET: getLegislator,
  PATCH: patchLegislator,
  PUT: editLegislator,
};

export default itemHandlers;
