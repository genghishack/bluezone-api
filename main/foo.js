import {LambdaRouter} from "../lib/lambda-lib";
import FooHandlers from './legislator/handlers';

export const router = LambdaRouter({
  handlers: FooHandlers,
  idType: 'uuid',
  isPublic: false
});
