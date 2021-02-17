import AWS from 'aws-sdk';
import { logDebug, logError } from "./logging-lib";

export async function getUserFromEvent(event) {
  // logDebug({event});
  if (!event || !event.requestContext || !event.requestContext.identity) {
    return Promise.reject(new Error('Insufficient event data to get user'));
  }

  const {
    cognitoAuthenticationProvider,
    cognitoIdentityId,
    cognitoIdentityPoolId,
    accountId,
    userArn,
  } = event.requestContext.identity;

  if (cognitoAuthenticationProvider) {
    const [userPoolId] = cognitoAuthenticationProvider
      .split('/')[2]
      .split(':');
    const userSub = cognitoAuthenticationProvider.split(':CognitoSignIn:')[1];
    const userParams = { UserPoolId: userPoolId, Username: userSub };

    const cognito = new AWS.CognitoIdentityServiceProvider({
      apiVersion: '2016-04-18'
    });

    try {
      const cognitoUser = await cognito.adminGetUser(userParams).promise();
      // logDebug({cognitoUser});
      const { UserAttributes } = cognitoUser;
      const [{ Value: userEmail }] = UserAttributes.filter(attr => attr.Name === 'email');

      const cognitoGroups = await cognito.adminListGroupsForUser(userParams).promise();
      // logDebug({cognitoGroups});
      const { Groups: userGroups } = cognitoGroups;
      // TODO: Account for multiple roles
      const [{ GroupName: userRole }] = userGroups;

      return {
        id: cognitoIdentityId,
        sub: userSub,
        email: userEmail,
        identityPoolId: cognitoIdentityPoolId,
        userPoolId: userPoolId,
        role: userRole,
        type: 'cognito',
      }
    } catch (e) {
      logError(e);
      return Promise.reject(e);
    }
  } else if (userArn) {
    return {
      id: accountId,
      arn: userArn,
      type: 'iam',
    }
  } else {
    return Promise.reject(new Error('No user found in event data'));
  }
}
