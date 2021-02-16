import Constants from '../constants';
import AWS from 'aws-sdk';

const ssm = new AWS.SSM();

export async function getSSMParameters(stage, prefix) {
  const parameters = {};
  const path = `/${Constants.appName}/${stage}/${prefix}/`;
  const response = await ssm.getParametersByPath({
    Path: path,
    Recursive: true
  }).promise();
  response.Parameters.forEach(param => {
    const parameterName = parameter.Name.substr(path.length);
    parameters[parameterName] = parameter.Value;
  });
  return Promise.resolve(parameters);
}
