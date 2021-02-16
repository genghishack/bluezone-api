import {LambdaRouter} from "../lib/lambda-lib";
import LegislatorHandlers from './legislator/handlers';

export const router = LambdaRouter({
  handlers: LegislatorHandlers,
  idType: 'bioguide',
  isPublic: false
});
