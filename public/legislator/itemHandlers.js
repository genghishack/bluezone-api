import {buildResponse, success, failure} from '../../lib/response-lib';
import {logError} from '../../lib/logging-lib';
import * as legislatorLib from '../../lib/queries/legislator-lib';

// open to anonymous users
async function getLegislator(user, id) {
  let legislator = {};
  try {
    legislator = await legislatorLib.getLegislator(id);
    // logDebug({legislator});
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
