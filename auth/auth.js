import passport from "passport";
import config from "../config/environment";
const BasicStrategy = require("passport-http").BasicStrategy;
const DigestStrategy = require("passport-http").DigestStrategy;
const ClientPasswordStrategy = require("passport-oauth2-client-password")
	.Strategy;

passport.use(
	new BasicStrategy(function(clientId, clientSecret, done) {
		if (
			config.auth["clientId"] === clientId &&
			config.auth["clientSecret"] === clientSecret
		) {
			return done(null, {
				id: config.auth.id,
				client: clientId,
				clientSecret: clientSecret
			});
		}
		return done(null, false);
	})
);

passport.use(
	new ClientPasswordStrategy(function(clientId, clientSecret, done) {
		if (
			config.auth["clientId"] === clientId &&
			config.auth["clientSecret"] === clientSecret
		) {
			return done(null, {
				id: config.auth.id,
				client: clientId,
				clientSecret: clientSecret
			});
		}
		return done(null, false);
	})
);
