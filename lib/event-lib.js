import AWS from 'aws-sdk';

export async function getUserDataFromEvent(event) {
  console.log('EVENT: ', event);
  if (!event || !event.requestContext || !event.requestContext.identity) {
    return Promise.reject(new Error('Not enough event data to get user info'));
  }

  const cognito = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });

  const {
    cognitoAuthenticationProvider,
    cognitoIdentityId,
    cognitoIdentityPoolId,
    accountId,
    userArn,
  } = event.requestContext.identity;

  const user = {};
  let userPoolId;
  let userSub;
  let userParams;

  if (cognitoAuthenticationProvider) {
    [userPoolId] = cognitoAuthenticationProvider
      .split('/')[2]
      .split(':');
    // eslint-disable-next-line prefer-destructuring
    userSub = cognitoAuthenticationProvider.split(':CognitoSignIn:')[1];
    userParams = { UserPoolId: userPoolId, Username: userSub };

    try {
      const cognitoUser = await cognito.adminGetUser(userParams).promise();
      console.log('cognitoUser: ', cognitoUser);

      const cognitoGroups = await cognito.adminListGroupsForUser(userParams).promise();
      console.log('cognitoGroups: ', cognitoGroups);

      const { UserAttributes } = cognitoUser;
      const [{ Value: userEmail }] = UserAttributes.filter(attr => attr.Name === 'email');
      const { Groups: userGroups } = cognitoGroups;
      const [{ GroupName: userRole }] = userGroups;

      user.id = cognitoIdentityId;
      user.sub = userSub;
      user.email = userEmail;
      user.identityPoolId = cognitoIdentityPoolId;
      user.userPoolId = userPoolId;
      user.role = userRole;
      user.type = 'cognito';

      return user;
    } catch (e) {
      console.log('Error: ', e);
      return Promise.reject(e);
    }
  } else if (userArn) {
    user.id = accountId;
    user.arn = userArn;
    user.type = 'iam';
    return user;
  } else {
    return Promise.reject(new Error('No userId found'));
  }
}
