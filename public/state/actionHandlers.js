import { buildResponse, success, failure } from '../../lib/response-lib';
import {logError} from "../../lib/logging";
import * as stateLib from '../../lib/state';

async function getDistrictsByState() {
  let statesWithDistricts = [];
  let districtsByState = {};
  try {
    statesWithDistricts = await stateLib.getAllStateDistricts();
    console.log('states with districts: ', statesWithDistricts);
    statesWithDistricts.forEach(row => {
      districtsByState[row.state_usps] = row.district_nums;
    });
    return success({data: districtsByState, count: 1});
  } catch (e) {
    logError(e);
    return failure({message: e.message});
  }
}

const actionHandlers = {
  GET: {
    districts: getDistrictsByState,
  },
};

export default actionHandlers;
