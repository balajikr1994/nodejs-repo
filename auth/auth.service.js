'use strict';

import expressJwt from 'express-jwt';
import compose from 'composable-middleware';
import _ from 'lodash';
import { resourceModel } from '../config/resource';
const config = require('../config/environment');

var validateJwt = expressJwt({
    secret: config.secrets["accessToken"]
});

export const isAuthenticated = () => {
    return compose()
        .use((req, res, next) => {
            if (req.query && req.query.hasOwnProperty('access_token')) {
                req.headers.authorization = 'Bearer ' + req.query.access_token;
            }
            validateJwt(req, res, next);
        })
        .use(async (req, res, next) => {
            try {
                const user = await resourceModel["users"].findById(req.user.userId);
                if (!user) {
                    return sendRsp(res, 404, "Not Found");
                }
                req.user = user;
                next();
            } catch (error) {
                return sendRsp(res, 500, "Server error");
            }
        })
}