import { buildResponse, success, failure } from '../../lib/response-lib';
import { logError } from '../../lib/logging';
import * as legislatorLib from '../../lib/legislator';

async function getLegislator(user, id) {
  let legislator = {};
  try {
    legislator = await legislatorLib.getLegislator(id)
    console.log('legislator: ', legislator);
    return success({ data: legislator, count: 1 });
  } catch (e) {
    logError(e);
    return failure({ message: e.message });
  }
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
