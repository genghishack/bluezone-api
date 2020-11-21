import { buildResponse, success, failure } from '../../lib/response-lib';

async function getFoo(user, id) {
  // uses id
  const message = 'single foo';
  console.log(message);
  const response = success({ data: message });
  return response;
}

async function deleteFoo(user, id) {
  // uses id
  const message = 'deleted foo';
  console.log(message);
  const response = success({ data: message });
  return response;
}

async function patchFoo(user, id, data) {
  // uses id, data
  const message = 'patched foo';
  console.log(message);
  const response = success({ data: message });
  return response;
}

async function editFoo(user, id, data) {
  // uses user, id
  const message = 'edited foo';
  console.log(message);
  const response = success({ data: message });
  return response;
}

const itemHandlers = {
  DELETE: deleteFoo,
  GET: getFoo,
  PATCH: patchFoo,
  PUT: editFoo,
};

export default itemHandlers;
