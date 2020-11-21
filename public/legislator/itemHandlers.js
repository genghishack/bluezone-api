import {buildResponse, success, failure} from '../../lib/response-lib';
import {logError} from '../../lib/logging';
import * as legislatorLib from '../../lib/legislator';

// open to anonymous users
async function getLegislator(user, id) {
  let legislator = {};
  try {
    legislator = await legislatorLib.getLegislator(id);
    console.log('legislator: ', legislator);
    return success({data: legislator, count: 1});
  } catch (e) {
    logError(e);
    return failure({message: e.message});
  }
}

const itemHandlers = {
  GET: getLegislator,
};

export default itemHandlers;
