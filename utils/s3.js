'use strict';

//import config from '../config/environment';
const configFIle = require("../config/environment");
const { URL } = require('url');
var AWS = require('aws-sdk');
var config = configFIle.default;

var s3 = new AWS.S3({
	accessKeyId: config.s3FileUpload.keyId,
	secretAccessKey: config.s3FileUpload.secret,
	region: config.s3FileUpload.region
});

module.exports = function (params, cb) {
	s3.upload(params, function (err, data) {
		if (err) {
			console.log("err", err);
			cb(err, null);
		}
		if (data) {
			cb(null, data.Location);
		}
	});
};

var s3delete = function s3delete(params, cb) {
	s3.deleteObjects(params, function (err, data) {
		if (err) {
			cb(err, null);
		}
		if (data) {
			console.log("Successfully removed from s3", data);
			cb(null, data);
		}
	});
}

const generateKey = (imageUrl) => {
	const myURL = new URL(imageUrl)
	return myURL.pathname.substr(1);
}

const generateSignedURL = function (imageUrl) {
	if (imageUrl) {
		let expiry = config.s3FileUpload.expiryInMinutes;
		let params = {
			Bucket: config.s3FileUpload.bucket,
			Key: generateKey(imageUrl),
			Expires: 50 *60
		};
		return s3.getSignedUrl('getObject', params);
	}
}

module.exports.s3delete = s3delete;
module.exports.generateSignedURL = generateSignedURL;