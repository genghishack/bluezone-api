import Constants from '../constants';
import {getUserFromEvent} from './event-lib';
import {buildResponse, failure} from './response-lib';
import {logDebug, logError} from './logging-lib';

export const LambdaRouter = (options) => {
  const { handlers, idType, isPublic } = options;
  // logDebug({handlers, idType, isPublic});

  return async (event, context, callback) => {
    const {regex} = Constants;
    const {httpMethod, pathParameters, queryStringParameters, body} = event;
    // logDebug({httpMethod, pathParameters, queryStringParameters, body});

    let userData = {};
    if (!isPublic) {
      userData = await getUserFromEvent(event);
    }
    // logDebug('userData: ', userData);

    let action;
    let id;
    let data;

    if (pathParameters) {
      let {action: firstPathParam} = pathParameters;
      if (regex[idType].test(firstPathParam)) {
        id = pathParameters.action;
      } else {
        action = pathParameters.action;
        id = pathParameters.id;
      }
    }
    // logDebug({action, id});

    if (body) {
      data = JSON.parse(body);
    }

    let handlerSet = handlers.actionHandlers;
    if (!action && !id) {
      handlerSet = handlers.collectionHandlers;
    } else if (id && !action) {
      handlerSet = handlers.itemHandlers;
    }

    let response = buildResponse(405, {
      message: `Invalid HTTP Method: ${httpMethod}`,
    });

    try {
      if (httpMethod in handlerSet) {
        if (!action) {
          response = await handlerSet[httpMethod](userData, id, data);
        } else if (action in handlerSet[httpMethod]) {
          response = await handlerSet[httpMethod][action](userData, id, data);
        } else {
          response = buildResponse(406, {
            message: `Invalid Request: ${httpMethod} ${action}`,
          });
        }
      }
      return callback(null, response);
    } catch (e) {
      logError(e);
      return callback(null, failure({error: e.message}));
    }
  }
}
