import {LambdaRouter} from "../lib/lambda-lib";
import StateHandlers from './state/handlers';

export const router = LambdaRouter({
    handlers: StateHandlers,
    idType: 'state',
    isPublic: true
});
