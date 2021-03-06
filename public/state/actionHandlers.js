import { buildResponse, success, failure } from '../../lib/response-lib';
import {logDebug, logError} from "../../lib/logging-lib";
import * as stateLib from '../../lib/queries/state-lib';

// open to anonymous users
async function getDistrictsByState() {
  let statesWithDistricts = [];
  let districtsByState = {};
  try {
    statesWithDistricts = await stateLib.getAllStateDistricts();
    // logDebug({statesWithDistricts});
    statesWithDistricts.forEach(row => {
      districtsByState[row.state_usps] = row.district_nums;
    });
    return success({data: districtsByState, count: 1});
  } catch (e) {
    logError(e);
    return failure({message: e.message});
  }
}

// open to anonymous users
async function getStateAndDistrictBBoxes() {
  let result = {};
  let bboxes = {};
  try {
    result = await stateLib.getStateAndDistrictBBoxes();
    // logDebug('state and district bboxes: ', result);
    const [ row ] = result;
    const { state_bboxes: stateBBoxes, district_bboxes: districtBBoxes} = row;
    stateBBoxes.forEach(result => {
      bboxes[result.usps] = result.bbox;
    })
    districtBBoxes.forEach(result => {
      bboxes[`${result.usps}${result.district_num}`] = result.bbox;
    })
    return success({data: bboxes, count: 1});
  } catch (e) {
    logError(e);
    return failure({message: e.message});
  }
}

const actionHandlers = {
  GET: {
    districts: getDistrictsByState,
    bboxes: getStateAndDistrictBBoxes,
  },
};

export default actionHandlers;
