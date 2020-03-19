import { buildResponse, success, failure } from '../libs/response-lib';
import { logError } from '../libs/logging';
import { getUserDataFromEvent } from '../libs/event';

import migration from './dbMigration/005_createTable_USState';

/**
 *
 * This Lambda is to be used for any bulk data changes.
 *
 * @export
 * @param {Object} event
 * @param {Object} context
 * @param {function} callback
 * @returns
 */
export async function main(event, context, callback) {
  let response = buildResponse(405, {
    message: 'Unknown error',
  });
  try {
    const user = await getUserDataFromEvent(event);
    if (user.type !== 'iam') {
      throw (new Error('no permission'));
    }
    response = await migration();
    return callback(null, response);
  } catch (e) {
    logError(e);
    return callback(null, failure({ error: e.message }));
  }
}
