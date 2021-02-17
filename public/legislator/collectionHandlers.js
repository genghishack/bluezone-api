import { buildResponse, success, failure } from '../../lib/response-lib';
import * as legislatorLib from "../../lib/queries/legislator-lib";
import {logError} from "../../lib/logging-lib";

// open to anonymous users
async function listLegislators(user, id, data, params) {
  let date = null;
  if (params && params.date) {
    ({ date } = params);
  }

  let legislators = [];
  try {
    legislators = await legislatorLib.getAllLegislatorsByDate(date)
    // logDebug({legislators});
    return success({data: legislators, count: legislators.length});
  } catch (e) {
    logError(e);
    return failure({message: e.message});
  }
}

const collectionHandlers = {
  GET: listLegislators,
};

export default collectionHandlers;
