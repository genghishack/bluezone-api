import { buildResponse, success, failure } from '../../lib/response-lib';
import * as legislatorLib from "../../lib/legislator";
import {logError} from "../../lib/logging";

// open to anonymous users
async function listLegislators(user, id, data, params) {
  let date = null;
  if (params && params.date) {
    ({ date } = params);
  }

  let legislators = [];
  try {
    legislators = await legislatorLib.getAllLegislatorsByDate(date)
    console.log('legislators: ', legislators);
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
