import { buildResponse, success, failure } from '../../lib/response-lib';
import * as stateLib from '../../lib/state-lib';
import {logError} from "../../lib/logging-lib";

// open to anonymous users
async function listStates(user) {
  let states = [];
  try {
    states = await stateLib.getAllStates();
    console.log('states: ', states);
    return success({data: states, count: states.length});
  } catch (e) {
    logError(e);
    return failure({message: e.message});
  }
}

const collectionHandlers = {
  GET: listStates,
};

export default collectionHandlers;
