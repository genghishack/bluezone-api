import Constants from './constants';
import AWS from 'aws-sdk';

const ssm = new AWS.SSM();

export default async function getParams(stage, prefix) {
  const params = {};
  const path = `/${Constants.appName}/${stage}/${prefix}/`;
  const response = await ssm.getParametersByPath({
    Path: path,
    Recursive: true
  }).promise();
  response.Parameters.forEach(param => {
    const paramName = param.Name.substr(path.length);
    params[paramName] = param.Value;
  });
  return Promise.resolve(params);
}
